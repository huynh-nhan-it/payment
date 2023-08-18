using Microsoft.AspNetCore.Mvc;

using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Entities;

using Microsoft.Data.SqlClient;
using PaymentModule.DTOs;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PaymentModule.Services.IServices;
using PaymentModule.Services.Implements;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<UserModel> users = new List<UserModel>();
        public static List<AccountModel> accounts = new List<AccountModel>();
        public IUserService _userService;
        public PaymentContext _context;
        public IDepartmentService _departmentService;
        public ISupplierService _supplierService;
        public ICurrencyService _currencyService;
        public IPaymentMethodService _paymentMethodService;
        public IDetailRequestService _detailRequestService;
        private IDepartmentBearService _departmentBearService;
        private IPaymentRequestService _paymentRequestService;
        private readonly IConfiguration _configuration;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public UserController(PaymentContext paymentContext, IDepartmentService departmentService,
            ISupplierService supplierService,
            ICurrencyService currencyService,
            IPaymentMethodService paymentMethodService,
            IUserService userService,
            IConfiguration configuration,
            IDepartmentBearService departmentBearService,
            IPaymentRequestService paymentRequestService,
            IDetailRequestService detailRequestService,
            ConnectionStringSettings connectionStringSettings)
        {
            _context = paymentContext;
            _userService = userService;
            _departmentService = departmentService;
            _departmentBearService = departmentBearService;
            _supplierService = supplierService;
            _currencyService = currencyService;
            _paymentMethodService = paymentMethodService;
            _detailRequestService = detailRequestService;
            _configuration = configuration;
            _paymentRequestService = paymentRequestService;
            _connectionStringSettings = connectionStringSettings;
        }

        private async Task<ObjectResult> handleFile([FromForm] IFormFileCollection files, Guid Id)
        {
            var result = await _userService.HandleFile(files, Id);
            var data = result.Value as dynamic;
            if (data.Success)
            {
                return new ObjectResult(new { attachments = data.data, success = true, error = false});
            }
            return new ObjectResult(new { message = data.Message, success = false, error = true });

        }
        private ObjectResult HandleDetailRequest(DetailRequestDto request, Guid theId)
        {
           try
            {
                Guid departmentId = _departmentService.GetIdByDepartmentName(request.DepartmentName);
                Guid supplierId = _supplierService.GetIdBySupplierName(request.SupplierName);
                Guid curencyId = _currencyService.GetIdByCurrency(request.Currency);
                Guid paymentId = _paymentMethodService.GetIdByMethod(request.PaymentMethod);
                var detailRequest = new DetailRequestEntity
                {
                    Id = theId,
                    Purpose = request.Purpose,
                    PaymentFor = request.PaymentFor,
                    PONumber = request.PONumber.HasValue? request.PONumber.Value : 0,
                    DepartmentId = departmentId,
                    SupplierId = supplierId,
                    CurrencyId = curencyId,
                    ExchangeRate = request.ExchangeRate.HasValue ? request.ExchangeRate.Value : 0d,
                    PaymentMethodId = paymentId,
                };

                return new ObjectResult(new { detailRequest = detailRequest, success = true, error = false });
            }
            catch(Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message});
            }
        }

        [HttpPost("create-request")]
        public async Task<IActionResult> createRequest([FromForm] CreatePaymentRequestDto prd)
        {
            var RequestId = prd.RequestId;
            string RequestCode = "";
            Guid PaymentRequestId = Guid.NewGuid();

            if (!string.IsNullOrWhiteSpace(RequestId))
            {
                string DirPath = Path.Combine("data/request", RequestId);
                if (Directory.Exists(DirPath)) { Directory.Delete(DirPath, true); }
                var PaymentRequest = _context.PaymentRequests.FirstOrDefault(pr => pr.Id.ToString() == RequestId);
                if (PaymentRequest != null)
                {
                    PaymentRequestId = new Guid(RequestId);
                    RequestCode = PaymentRequest.RequestCode;
                    var DetailRequest = _context.DetailRequests.Include(dr => dr.Attachments)
                                               .Include(dr => dr.DetailRequestTables)
                                               .Include(dr => dr.Comments)
                                               .Include(dr => dr.Approvers)
                                               .Include(dr => dr.TotalPayment)
                                               .Include(dr => dr.Bank)
                                               .FirstOrDefault(dr => dr.Id.Equals(PaymentRequest.DetailRequestId));

                    if (DetailRequest != null)
                    {
                        // Xóa các bản ghi liên quan từ các bảng con
                        _context.RemoveRange(DetailRequest.Attachments);
                        _context.RemoveRange(DetailRequest.DetailRequestTables);
                        _context.RemoveRange(DetailRequest.Comments);

                        // Xóa các bản ghi liên quan từ bảng n-n
                        foreach (var approver in DetailRequest.Approvers.ToList())
                        {
                            DetailRequest.Approvers.Remove(approver);
                        }

                        // Xóa các bản ghi liên quan từ bảng 1-1 (nếu có)
                        if (DetailRequest.TotalPayment != null)
                        {
                            _context.TotalPayments.Remove(DetailRequest.TotalPayment);
                        }

                        if (DetailRequest.Bank != null)
                        {
                            _context.Banks.Remove(DetailRequest.Bank);
                        }

                        // Cuối cùng, xóa bản ghi từ bảng DetailRequestEntity
                        _context.PaymentRequests.Remove(PaymentRequest);
                        _context.DetailRequests.Remove(DetailRequest);
                        _context.SaveChanges();

                    }
                }
            }
            
            Guid theId = Guid.NewGuid();
            string? purpose = string.IsNullOrEmpty(prd.Purpose) ? "" : prd.Purpose; 
            string? department = string.IsNullOrEmpty(prd.Department) ? "OPUS Company" : prd.Department; //important
            string? paymentfor = string.IsNullOrEmpty(prd.PaymentFor) ? "" : prd.PaymentFor;
            string? supplier = string.IsNullOrEmpty(prd.Supplier) ? "1041171-Công Ty TNHH Opus Solution" : prd.Supplier;  //important
            string? currency = string.IsNullOrEmpty(prd.Currency) ? "VND" : prd.Currency;
            double? exchange = prd.ExchangeRate.HasValue ? prd.ExchangeRate.Value : 0d;
            int? ponumber = prd.PONumber.HasValue ? prd.PONumber : 0;
            IFormFileCollection? files = prd.files;
            string? paymentmethod = string.IsNullOrEmpty(prd.PaymentMethod) ? "" : prd.PaymentMethod;
            string typeSave = prd.typeSave;
            double? suggestedAmount = prd.SuggestedAmount.HasValue ? prd.SuggestedAmount.Value : 0d;
            double? tax = prd.Tax.HasValue ? prd.Tax.Value : 0d;
            double? advanceAmount = prd.AdvanceAmount.HasValue ? prd.AdvanceAmount.Value : 0d;
            double? totalPayment = prd.TotalPayment.HasValue ? prd.TotalPayment.Value : 0d;

            string s = @"[{
            ""invDate"": """",
            ""paymentContent"": """",
            ""amount"": 0,
            ""invNo"": 0,
            ""industry"": """",
            ""departmentBear"": ""Nothing selected"",
            ""note"": """"
        }]";

            // Trích xuất đoạn JSON từ chuỗi s
            JArray jsonArray = JArray.Parse(s);
            JObject jsonObject = (JObject)jsonArray[0];

            // Lấy ngày hiện tại
            DateTime currentDate = DateTime.Now;

            // Cộng thêm ngày/tháng/năm hiện tại vào trường "invDate"
            DateTime invDate = jsonObject["invDate"].Value<string>() == ""
                ? currentDate // Nếu trường "invDate" rỗng thì lấy ngày hiện tại
                : DateTime.Parse(jsonObject["invDate"].Value<string>()).Add(currentDate.Date - currentDate);

            // Cập nhật trường "invDate" trong đoạn JSON
            jsonObject["invDate"] = invDate;

            // Chuyển đoạn JSON đã cập nhật thành chuỗi và lưu vào biến "s"
            s = jsonArray.ToString(Formatting.None);


            List<DetailTableDto> detailTables = JsonConvert.DeserializeObject<List<DetailTableDto>>((prd.DetailTable == "" || prd.DetailTable == null) ? s : prd.DetailTable); 
            List<ApproverDto> approvers = JsonConvert.DeserializeObject<List<ApproverDto>>((prd.Approvers == "" || prd.Approvers == null) ? "[ { \"fullName\": \"\", \"email\": \"daniel.wilson@example.com\", \"jobTitle\": \"\" }]" : prd.Approvers);
            string authorizationHeader = Request.Headers["Authorization"];
            string token = "";
            string userId = prd.UserId;
            var options = new JsonSerializerOptions{ WriteIndented = true, ReferenceHandler = ReferenceHandler.Preserve};


      
            string filePath = Path.Combine("data/request", theId.ToString());

            if (prd.typeSave == "create-request" || prd.typeSave == "re-submit")
            {
                if (string.IsNullOrWhiteSpace(purpose)
                    || string.IsNullOrWhiteSpace(department)
                    || string.IsNullOrWhiteSpace(paymentfor)
                    || string.IsNullOrWhiteSpace(supplier)
                    || string.IsNullOrWhiteSpace(currency))
                {
                    if(currency != "VND")
                    {
                        return Ok("Please enter the required information Exchange Rate");
                    }
                    if(prd.typeSave == "re-submit" && string.IsNullOrWhiteSpace(RequestId))
                    {
                        return Ok("Re-submit Failed");
                    }
                    if (Directory.Exists(filePath)) { Directory.Delete(filePath, true); }
                    return Ok("Please enter the required information");
                }
            }


            var detailRequestDto = new DetailRequestDto
            {
                Purpose = purpose,
                DepartmentName = department,
                PaymentFor = paymentfor,
                SupplierName = supplier,
                Currency = currency,
                ExchangeRate = exchange,
                PONumber = ponumber,
                PaymentMethod = paymentmethod,
            };

            var totalPaymentDto = new TotalPaymentDto
            {
                SuggestedAmount = suggestedAmount,
                Tax = tax,
                AdvanceAmount = advanceAmount,
                TotalPayment = totalPayment,
            };

            var resultHandleDR = HandleDetailRequest(detailRequestDto, theId).Value as dynamic;
            if(resultHandleDR?.success)
            { 
                _context.DetailRequests.Add(resultHandleDR?.detailRequest);
                _context.SaveChanges();
            }

            var resultHandDT = _detailRequestService.HandleDetailTable(detailTables, theId).Value as dynamic;
            var resultHandTotal = _detailRequestService.HandleTotalPayment(totalPaymentDto, theId).Value as dynamic;
            var resultHandleAP = _detailRequestService.HandleApprovers(approvers, theId).Value as dynamic;
            var resultHandleFile = await handleFile(files, theId);
            var filesResults = resultHandleFile.Value as dynamic;  

            if (resultHandTotal?.success)
            {
                _context.TotalPayments.Add(resultHandTotal?.totalPayment);
                _context.SaveChanges();
            }
            
            if (resultHandDT?.error || resultHandleDR?.error || resultHandleAP?.error)
            {
                if (Directory.Exists(filePath)) { Directory.Delete(filePath, true); }
            }
            if (resultHandleDR ?.error) { return BadRequest(resultHandleDR?.message); }
            if (resultHandDT ?.error) { return BadRequest(resultHandDT ?.message); }
            if (resultHandleAP ?.error) { return BadRequest(resultHandleAP?.message); }
            if (resultHandTotal?.error) { return BadRequest(resultHandTotal?.message); }

            foreach (DetailTableEntity table in resultHandDT.detailTableEntity)
            {
                _context.DetailTables.Add(table);
            }

            foreach (AttachmentEntity attachment in filesResults?.attachments)
            {
                _context.Attachments.Add(attachment);
            }

            var resultInsertpaymentRequest = _paymentRequestService.InsertpaymentRequest(theId, userId, typeSave, RequestCode, PaymentRequestId).Value as dynamic;
            if (resultInsertpaymentRequest?.error) {
                if (Directory.Exists(filePath)) { Directory.Delete(filePath, true); }
                return BadRequest(resultInsertpaymentRequest?.message); 
            }

            _context.SaveChanges();
            var jsonPaymentRequests = System.Text.Json.JsonSerializer.Serialize(new { PaymentRequests = _context.PaymentRequests.ToList() }, options);
            string formattedJson = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(jsonPaymentRequests), Formatting.Indented);

            return Ok(new { success = true, error = false, formattedJson }) ;

        }

        [HttpPost("accept-or-not")]
        public IActionResult ApproverAction(AcceptRequestDto accept)
        {
            Guid approverId = accept.ApproverId; //viết hàm check approverID xem có tồn tại hay không

            Guid requestId = accept.RequestId; //viết hàm check requestID xem có tồn tại hay không

            //viết hàm check xem ApproverId có quyền duyệt RequestId đó trong bảng approver-detail-table hay không

            string status = accept.Action;

            //viết hàm lấy ID của thằng Approver tiếp theo 


            if (CheckRightsOfApprover(approverId, requestId) == true)
            {
                if (status.Contains("Approved"))
                {
                    //đổi trạng thái trong approver-detail-table => Approved
                    ChangeState(approverId, requestId, "ApproverDetailRequest", status);

                    /* kiểm tra xem nó có phải thằng cuối cùng hay không

                       + nếu phải thì set status trong payment-request => Approved => kết thúc thuật toán

                       + nếu không phải thì đổi trạng thái Current trong approver-detail-table cho thằng appover tiếp theo*/

                    if (IsTheLastOne(approverId, requestId))
                    {
                        //cập nhật status bên payment request thành Done
                        ChangePRStatus(requestId, new Guid("84A1B594-5C31-4197-B99E-F3906DB706C8"));
                        return Ok(new { mess = "ALL APPROVED" });
                    }
                    else
                    {
                        ChangeState(GetTheNextApproverID(approverId, requestId), requestId, "ApproverDetailRequest", "Current");
                        return Ok(new {mess = "Succeed"});
                    }
                }
                else if (status.Contains("Rejected"))
                //nếu approver chọn Rejected => set status trong payment-request => Rejected & tất cả status của requets đó trong approver-detail-table thành Rejected => kết thúc thuật toán
                {
                    ChangeState(approverId, requestId, "ApproverDetailRequest", status);
                    //Viết hàm cập nhật status bên payment request
                    ChangePRStatus(requestId, new Guid("8845CC80-77F7-4F7B-B23D-CA994B8D07A4"));
                    //Viết hàm cập nhật all status bên approver-detail-table thành Rejected 
                    return Ok(new { mess = "ALL REJECTED" });
                }
            }
            else
            {
                return Ok(new { mess = "NOT YOUR TURN" });
            }
            return Ok();
        }

        //Lấy id của approver tiếp theo
        private Guid GetTheNextApproverID(Guid ApproverId, Guid DetailRequestId)
        {
            string selectQuery = "Select * From ApproverDetailRequest Where ApproverId = @ApproverId and DetailRequestId = @DetailRequestId";

            string selectNextApproverId = "Select * From ApproverDetailRequest Where DetailRequestId = @DetailRequestId and Queue = @Queue";

            int theNextApproverQueue = 0;
            Guid TheNextApproverID = new Guid();

            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@ApproverId", ApproverId);
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            theNextApproverQueue = (int)reader["Queue"] + 1;
                        }
                    }
                }

                using (SqlCommand command = new SqlCommand(selectNextApproverId, connection))
                {
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    command.Parameters.AddWithValue("@Queue", theNextApproverQueue);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            TheNextApproverID = (Guid)reader["ApproverId"];
                        }
                    }
                }
                return TheNextApproverID;
            }
        }

        //Kiểm tra có phải thằng cuối cùng hay không
        private bool IsTheLastOne(Guid ApproverId, Guid DetailRequestId)
        {
            string selectQuery = "select count(*) as mySum from ApproverDetailRequest where DetailRequestId = @DetailRequestId";
            int sumOf = 0;
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            sumOf = (int)reader["mySum"];
                        }
                    }
                }
            }

            if (GetQueueById(ApproverId, DetailRequestId) == sumOf)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //Lấy ra thứ tự của nó
        private int GetQueueById(Guid ApproverId, Guid DetailRequestId)
        {
            string selectQuery = "Select * From ApproverDetailRequest Where ApproverId = @ApproverId and DetailRequestId = @DetailRequestId";
            int myQueue = 0;
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@ApproverId", ApproverId);
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            myQueue = (int)reader["Queue"];
                        }
                    }
                }
            }
            return myQueue;
        }

        //Change status     
        private bool ChangeState(Guid ApproverId, Guid DetailRequestId, string tableName, string Status)
        {
            string updateQuery = $"Update [{tableName}] set Status = @Status where DetailRequestId = @DetailRequestId and ApproverId = @ApproverId";
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(updateQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@Status", Status);
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    command.Parameters.AddWithValue("@ApproverId", ApproverId);
                    command.ExecuteNonQuery();
                }
            }
            return true;
        }

        //Kiểm tra approver có quyền duyệt hay không
        private bool CheckRightsOfApprover(Guid ApproverId, Guid DetailRequestId)
        {
            string selectQuery = "select * from ApproverDetailRequest where DetailRequestId = @DetailRequestId and ApproverId = @ApproverId";
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    command.Parameters.AddWithValue("@ApproverId", ApproverId);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            if (reader["Status"].Equals("Current") == true)
                            {
                                return true;
                            }
                        }

                    }
                }
            }
            return false;
        }

        private bool ChangePRStatus(Guid detailRequestId, Guid StatusId)
        {
            var paymentRequest = _context.PaymentRequests.SingleOrDefault(pr => pr.DetailRequestId.Equals(detailRequestId));
            if (paymentRequest != null)
            {
                paymentRequest.StatusId = StatusId;
            }
            _context.SaveChanges();
            return true;
        }

        private bool ChangeAllStatusReject(Guid DetailRequestId)
        {
            string updateQuery = "Update ApproverDetailRequest set Status = @Status where DetailRequestId = @DetailRequestId";
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(updateQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@Status", "Rejected");
                    command.Parameters.AddWithValue("@DetailRequestId", DetailRequestId);
                    command.ExecuteNonQuery();
                }
            }
            return true;
        }

        [HttpDelete("delete-request")]

        public IActionResult deleteRequest(Guid RequestId)
        {
            var Request = _context.PaymentRequests.FirstOrDefault(p => p.Id.Equals(RequestId));
            if (Request != null)
            {
                try
                {
                    Request.IsDeleted = 0;
                    _context.PaymentRequests.Update(Request);
                    _context.SaveChanges();
                    return Ok(new { success = true, error = false, message = "Delete Request successful" });
                }
                catch (Exception e)
                {
                    return BadRequest(new { success = false, error = true, message = e.Message });
                }
            }
            return BadRequest(new { success = false, error = true, message = "Does not exist request" });
        }

        [HttpGet("check-my-turn")]
        public IActionResult CheckTurn(Guid ApproverId, Guid DetailRequestId)
        {
            try
            {
                return Ok(CheckRightsOfApprover(ApproverId, DetailRequestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { success = false, error = true, message = e.Message });
            }
        }
       
    }
}
