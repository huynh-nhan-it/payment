using Microsoft.AspNetCore.Mvc;

using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Entities;

using Microsoft.Data.SqlClient;
using PaymentModule.DTOs;
using PaymentModule.Repository;
using PaymentModule.Service;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
        public IDepartmentRepository _departmentRepository;
        public ISupplierRepository _supplierRepository;
        public ICurrencyRepository _currencyRepository;
        public IPaymentMethodRepository _paymentMethodRepository;
        public IDetailRequestRepository _detailRequestRepository;
        private IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public UserController(PaymentContext paymentContext, IDepartmentRepository departmentRepository,
            ISupplierRepository supplierRepository,
            ICurrencyRepository currencyRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IUserRepository userRepository,
            IUserService userService,
            IConfiguration configuration,
            IDetailRequestRepository detailRequestRepository,
            ConnectionStringSettings connectionStringSettings)
        {
            _context = paymentContext;
            _userService = userService;
            _departmentRepository = departmentRepository;
            _supplierRepository = supplierRepository;
            _currencyRepository = currencyRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _userRepository = userRepository;
            _detailRequestRepository = detailRequestRepository;
            _configuration = configuration;
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
                Guid? departmentId = _departmentRepository.GetIdByDepartmentName(request.DepartmentName);
                Guid? supplierId = _supplierRepository.GetIdBySupplierName(request.SupplierName);
                Guid? curencyId = _currencyRepository.GetIdByCurrency(request.Currency);
                Guid? paymentId = _paymentMethodRepository.GetIdByMethod(request.PaymentMethod);
                var detailRequest = new DetailRequestEntity
                {
                    Id = theId,
                    Purpose = request.Purpose,
                    PaymentFor = request.PaymentFor,
                    PONumber = request.PONumber,
                    DepartmentId = departmentId.HasValue ? departmentId.Value : Guid.Empty,
                    SupplierId = supplierId.HasValue ? supplierId.Value : Guid.Empty,
                    CurrencyId = curencyId.HasValue ? curencyId.Value : Guid.Empty,
                    PaymentMethodId = paymentId.HasValue ? paymentId.Value : Guid.Empty
                };

                return new ObjectResult(new { detailRequest = detailRequest, success = true, error = false });
            }
            catch(Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message});
            }
        }


        private ObjectResult HandleTotalPayment(TotalPaymentDto request, Guid theId)
        {
            try
            {
                var totalPayment = new TotalPaymentEntity
                {
                    SuggestedAmount = request.SuggestedAmount,
                    Tax = request.Tax,
                    AdvanceAmount = request.AdvanceAmount,
                    TotalPayment = request.TotalPayment,
                    DetailRequestID = theId,
                };

                return new ObjectResult(new { totalPayment = totalPayment, success = true, error = false });
            }
            catch (Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message });
            }
        }

        private ObjectResult HandleDetailTable(List<DetailTableDto> Table, Guid requestId)
        {
            string error_mess = "Please enter the required information";
            ICollection<DetailTableEntity> detailTableEntitys = new List<DetailTableEntity>();
            foreach (DetailTableDto colunm in Table)
            {
                if (colunm.Amount < 0  || colunm.PaymentContent == null)
                {
                    return new ObjectResult(new { success = false, error = true, message = error_mess });
                }
                var detailTableEntity = new DetailTableEntity
                {
                    InvDate = colunm.InvDate,
                    PaymentContent = colunm.PaymentContent,
                    Amount = colunm.Amount,
                    InvNo = colunm.InvNo,
                    Industry = colunm.Industry,
                    DepartmentTableId = (Guid)_departmentRepository.GetIdByDepartmentName(colunm.DepartmentBear),
                    Note = colunm.Note,
                    DetailRequestId = requestId,
                };
                detailTableEntitys.Add(detailTableEntity);
                
            }
            return new ObjectResult(new { detailTableEntity = detailTableEntitys, success = true, error = false});
        }

        private ObjectResult HandleApprovers(List<ApproverDto> approvers, Guid requestId)
        {
            string connectionString = _connectionStringSettings.ConnectionString;
            string error = "Please enter the required information";
            try
            {
                int queue = 1;
                foreach (ApproverDto approver in approvers)
                {
                    if (approver == null) { return new ObjectResult(new { success = false, error = true, message = error }); }

                    string insertQuery = "INSERT INTO ApproverDetailRequest (ApproverId, DetailRequestId, Queue, Status) VALUES (@ApproverId, @DetailRequestId, @Queue, @Status)";

                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        using (SqlCommand command = new SqlCommand(insertQuery, connection))
                        {
                            // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                            command.Parameters.AddWithValue("@DetailRequestId", requestId.ToString());
                            command.Parameters.AddWithValue("@ApproverId", (Guid)_userRepository.GetIdByEmail(approver.Email));
                            command.Parameters.AddWithValue("@Queue", queue);
                            if (queue == 1)
                            {
                                command.Parameters.AddWithValue("@Status", "Current");
                            }
                            else
                            {
                                command.Parameters.AddWithValue("@Status", "Waiting");
                            }
                            connection.Open();
                            command.ExecuteNonQuery();
                        }
                    }
                    queue++;
                }
                return new ObjectResult(new { success = true, error = false, });
            }
            catch (Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message });
            }
        }
       
        private ObjectResult InsertpaymentRequest(Guid requestId, string userId)
        {
            try
            {
                string resultRequestCode;
                var lastPaymentRequest = _context.PaymentRequests
                    .OrderByDescending(pr => pr.Id)
                    .FirstOrDefault();

                if (lastPaymentRequest != null)
                {
                    resultRequestCode = _userService.GetRequestCode(lastPaymentRequest.RequestCode);
                    if (resultRequestCode == "")
                    {
                        return new ObjectResult(new { success = false, error = true, message = "Can't not get request code from server" });
                    }
                }
                else
                {
                    resultRequestCode = "2023OPS-PAY-000001";
                }

                var paymentRequest = new PaymentRequestEntity
                {
                    RequestCode = resultRequestCode, //Testing...
                    Purpose = _detailRequestRepository.GetPurposeById(requestId),
                    StatusId = new Guid("80BCF31A-08AA-433D-879D-AB55E7730045"), //Approving
                    UserId = new Guid(string.IsNullOrEmpty(userId) ? "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9" : userId), //Testing...
                    CreateAt = DateTime.Now,
                    DetailRequestId = requestId
                };

                _context.PaymentRequests.Add(paymentRequest);
                _context.SaveChanges();

                return new ObjectResult(new { success = true, error = false, message = "Insert payment request success" });
            }
            catch (Exception ex)
            {
                return new ObjectResult(new { success = false, error = true, message = ex.ToString() });
            }
        }


        [HttpPost("create-request")]
        public async Task<IActionResult> createRequest([FromForm] CreatePaymentRequestDto prd)
        {
            Guid theId = Guid.NewGuid();
            string purpose = prd.Purpose;
            string department = prd.Department;
            string paymentfor = prd.PaymentFor;
            string supplier = prd.Supplier; 
            string currency = prd.Currency;
            int ponumber = prd.PONumber;
            IFormFileCollection files = prd.files;
            string paymentmethod = prd.PaymentMethod;
            

            double suggestedAmount = prd.SuggestedAmount;
            double tax = prd.Tax;
            double advanceAmount = prd.AdvanceAmount;
            double totalPayment = prd.TotalPayment;

            List<DetailTableDto> detailTables = JsonConvert.DeserializeObject<List<DetailTableDto>>(prd.DetailTable); 
            List<ApproverDto> approvers = JsonConvert.DeserializeObject<List<ApproverDto>>(prd.Approvers);
            string authorizationHeader = Request.Headers["Authorization"];
            string token = "";
            string userId = "";
            var options = new JsonSerializerOptions{ WriteIndented = true, ReferenceHandler = ReferenceHandler.Preserve};
       

            /* if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
             {
                 string secretKey = _configuration["AppSettings:Token"];
                 token = authorizationHeader.Substring("Bearer ".Length);
                 userId = _userService.DecodeToken(token, secretKey);
                 if (userId == "") { return BadRequest(new ObjectResult(new { success = false, error = true, message = "Process get token has error" })); }
             }
             else { return BadRequest(new { success = false, error = true, message = "Token not found in header" }); }*/


            var detailRequestDto = new DetailRequestDto
            {
                Purpose = purpose,
                DepartmentName = department,
                PaymentFor = paymentfor,
                SupplierName = supplier,
                Currency = currency,
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

            var resultHandDT = HandleDetailTable(detailTables, theId).Value as dynamic;
            var resultHandTotal = HandleTotalPayment(totalPaymentDto, theId).Value as dynamic;
            var resultHandleAP = HandleApprovers(approvers, theId).Value as dynamic;
            var resultHandleFile = await handleFile(files, theId);
            var filesResults = resultHandleFile.Value as dynamic;
            string filePath = Path.Combine("data/request", theId.ToString());

            if (resultHandTotal?.success)
            {
                _context.TotalPayments.Add(resultHandTotal?.totalPayment);
                _context.SaveChanges();
            }
            if (purpose == null || department == null || paymentfor == null || supplier == null)
            {
                if (Directory.Exists(filePath)) { Directory.Delete(filePath, true); }
                return BadRequest("Please enter the required information");
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

            var resultInsertpaymentRequest = InsertpaymentRequest(theId, userId).Value as dynamic;
            if (resultInsertpaymentRequest?.error) {
                if (Directory.Exists(filePath)) { Directory.Delete(filePath, true); }
                return BadRequest(resultInsertpaymentRequest?.message); 
            }

            _context.SaveChanges();
            var jsonPaymentRequests = System.Text.Json.JsonSerializer.Serialize(new { PaymentRequests = _context.PaymentRequests.ToList() }, options);
            string formattedJson = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(jsonPaymentRequests), Formatting.Indented);

            return Ok(new { success = true, error = false, formattedJson }) ;

        }

      
        [HttpGet("{id}")]
        public IActionResult GetName(Guid id)
        {
            string myName = _userRepository.GetFullNameById(id);
            return Ok(new { name = myName });
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
                        //cập nhật status bên payment request thành approved
                        ChangePRStatus(requestId, new Guid("66617255-A3A8-4483-9008-B86F16765E6B"));
                        return Ok(new { mess = "ALL APPROVED" });
                    }
                    else
                    {
                        ChangeState(GetTheNextApproverID(approverId, requestId), requestId, "ApproverDetailRequest", "Current");
                        return Ok();
                    }
                }
                else if (status.Contains("Rejected"))
                //nếu approver chọn Rejected => set status trong payment-request => Rejected & tất cả status của requets đó trong approver-detail-table thành Rejected => kết thúc thuật toán
                {
                    //Viết hàm cập nhật status bên payment request
                    ChangePRStatus(requestId, new Guid("8845CC80-77F7-4F7B-B23D-CA994B8D07A4"));
                    //Viết hàm cập nhật all status bên approver-detail-table thành Rejected 
                    ChangeAllStatusReject(requestId);
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
    }
}
