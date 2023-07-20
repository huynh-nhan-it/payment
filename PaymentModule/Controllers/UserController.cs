using Microsoft.AspNetCore.Mvc;

using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Entities;

using Microsoft.Data.SqlClient;
using PaymentModule.DTOs;
using PaymentModule.Repository;
using PaymentModule.Service;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

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

                foreach (ApproverDto approver in approvers)
                {
                    if (approver == null) { return new ObjectResult(new { success = false, error = true, message = error }); }

                    string insertQuery = "INSERT INTO ApproverDetailRequest (ApproverId, DetailRequestId) VALUES (@ApproverId, @DetailRequestId)";

                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        using (SqlCommand command = new SqlCommand(insertQuery, connection))
                        {
                            // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                            command.Parameters.AddWithValue("@DetailRequestId", requestId.ToString());
                            command.Parameters.AddWithValue("@ApproverId", (Guid)_userRepository.GetIdByEmail(approver.Email));
                            connection.Open();
                            command.ExecuteNonQuery();
                        }
                    }
                }
                return new ObjectResult(new { success = true, error = false, });
            }
            catch (Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message });
            }
        }

        /*private ObjectResult InsertpaymentRequest(Guid requestId, string userId)
        {
            string connectionString = _connectionStringSettings.ConnectionString;
            string RequestCode;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    // Mở kết nối
                    connection.Open();

                    // Tạo câu truy vấn SQL để lấy dòng cuối cùng từ bảng Employees (sắp xếp theo cột Id giảm dần)
                    string sqlQuery = "SELECT TOP 1 RequestCode FROM PaymentRequests ORDER BY Id DESC";

                    // Tạo đối tượng SqlCommand
                    using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                    {
                        // Thực thi câu truy vấn và lấy dữ liệu vào SqlDataReader
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            string resultRequestCode;
                            if (reader.Read())
                            {
                                RequestCode = reader.GetString(0);
                                resultRequestCode = _userService.GetRequestCode(RequestCode);
                                if (resultRequestCode == "") {
                                    return new ObjectResult(new { success = false, error = true, message = "Can't not get request code from server" });
                                }
                            }
                            else
                            {
                                resultRequestCode = "2023OPS-PAY-000001";
                            }
                            var paymentRequest = new PaymentRequestEntity
                            {
                                Id = Guid.NewGuid(),
                                RequestCode = resultRequestCode, //Testing...
                                Purpose = _detailRequestRepository.GetPurposeById(requestId),
                                StatusId = new Guid("80BCF31A-08AA-433D-879D-AB55E7730045"), //Approving
                                UserId = new Guid(userId == "" ? "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9": userId), //Testing...
                                CreateAt = DateTime.Now,
                                DetailRequestId = requestId
                            };
                            _context.PaymentRequests.Add(paymentRequest);
                            _context.SaveChanges();
                            return new ObjectResult(new { success = true, error = false, message = "Insert payment request success" });
                        }
                    }
                }
                catch (Exception ex)
                {
                    return new ObjectResult(new { success = false, error = true, message = ex.ToString() });
                }
                
            }
        }*/

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
            IFormFileCollection files = Request.Form.Files;
            string paymentmethod = prd.PaymentMethod;
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


            var resultHandleDR = HandleDetailRequest(detailRequestDto, theId).Value as dynamic;
            if(resultHandleDR?.success)
            {
                _context.DetailRequests.Add(resultHandleDR?.detailRequest);
                _context.SaveChanges();
            }

            var resultHandDT = HandleDetailTable(detailTables, theId).Value as dynamic;
            var resultHandleAP = HandleApprovers(approvers, theId).Value as dynamic;
            var resultHandleFile = await handleFile(files, theId);
            var filesResults = resultHandleFile.Value as dynamic;
            string filePath = Path.Combine("data", theId.ToString());


            if(purpose == null || department == null || paymentfor == null || supplier == null)
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
            if (filesResults?.error) { return BadRequest(filesResults?.message); }

            foreach(DetailTableEntity table in resultHandDT.detailTableEntity)
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
            return Ok(new {jsonPaymentRequests, detailTables});
  
        }

      
        [HttpGet("{id}")]
        public IActionResult GetName(Guid id)
        {
            string myName = _userRepository.GetFullNameById(id);
            return Ok(new { name = myName });
        }

    }
}
