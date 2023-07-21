using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Repository;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentRequestController : ControllerBase
    {
        private readonly PaymentContext _context;
        private readonly IStatusRepository _statusRepository;
        private readonly IUserRepository _userRepository;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public PaymentRequestController(PaymentContext paymentContext, IStatusRepository statusRepository, IUserRepository userRepository, ConnectionStringSettings connectionStringSettings)
        {
            _statusRepository = statusRepository;
            _userRepository = userRepository;
            _context = paymentContext;
            _connectionStringSettings = connectionStringSettings;
        }

        [HttpGet]
        public IActionResult GetPaymentRequests(string? Purpose, string? RequestCode, DateTime? from, DateTime? to, string? Creater, string? Status, int? page)
        {
            try
            {
                var paymentRequests = _context.PaymentRequests.AsQueryable();

                if(!string.IsNullOrEmpty(Purpose))
                {
                    paymentRequests = paymentRequests.Where(paymentRequest =>  paymentRequest.Purpose.Contains(Purpose));
                }

                if(!string.IsNullOrEmpty(RequestCode))
                {
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.RequestCode.Contains(RequestCode));
                }

                if (!string.IsNullOrEmpty(Creater))
                {
                    Guid CreaterId = (Guid) _userRepository.GetIdByFullName(Creater);
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.UserId.Equals(CreaterId));
                }

                if (!string.IsNullOrEmpty(Status))
                {
                    Guid statusId = _statusRepository.GetIdByStatus(Status);
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.StatusId.Equals(statusId));
                }

                if (from.HasValue)
                {
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.CreateAt >= from.Value);
                }

                if (to.HasValue)
                {
                    DateTime toDate = to.Value.AddDays(1);
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.CreateAt < toDate);
                }
                if(page.HasValue)
                {
                    paymentRequests = paymentRequests.Skip((int)(page - 1) * 1).Take(1);
                }
                var paymentRequestList = paymentRequests.ToList().Select(PREntity => new PaymentRequestModel
                {
                    RequestCode = PREntity.RequestCode,
                    Purpose = PREntity.Purpose,
                    CreatedBy = _userRepository.GetFullNameById(PREntity.UserId),
                    CreatedDate = PREntity.CreateAt,
                    Status = _statusRepository.GetStatusById(PREntity.StatusId),
                });
                return Ok(paymentRequestList.ToList());

        
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GenerateExcel")]
        public async Task<IActionResult> GenerateExcel()
        {
            List<PaymentRequestModel> PaymentRequestList = new List<PaymentRequestModel>();

            foreach (PaymentRequestEntity paymentRequest in _context.PaymentRequests.ToList())
            {
                PaymentRequestModel request = new PaymentRequestModel
                {
                    RequestCode = paymentRequest.RequestCode,
                    Purpose = paymentRequest.Purpose,
                    CreatedBy = _userRepository.GetFullNameById(paymentRequest.UserId),
                    CreatedDate = paymentRequest.CreateAt,
                    Status = _statusRepository.GetStatusById(paymentRequest.StatusId),
                };
                PaymentRequestList.Add(request);
            }

            string emailtemplatepath = Path.Combine(Directory.GetCurrentDirectory(), "Export//ExportExcel.html");
            string htmldata = System.IO.File.ReadAllText(emailtemplatepath);

            string excelstring = "";
            foreach (PaymentRequestModel request in PaymentRequestList)
            {
                excelstring += "<tr>" +
                        "<td>" + request.RequestCode + "</td>" +
                        "<td>" + request.Purpose + "</td>" +
                        "<td>" + request.CreatedBy + "</td>" +
                        "<td>" + request.CreatedDate + "</td>" +
                        "<td>" + request.Status + "</td>" +
                    "</tr>";
            }
            htmldata = htmldata.Replace("@@ActualData", excelstring);

            string StoredFilePath = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFiles", DateTime.Now.Ticks.ToString() + ".xls");
            System.IO.File.AppendAllText(StoredFilePath, htmldata);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(StoredFilePath, out var contettype))
            {
                contettype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(StoredFilePath);

            return File(bytes, contettype, Path.Combine(StoredFilePath));

        }

        [HttpGet("SendToMe")]
        public IActionResult GetSendToMeRequest(Guid myId)
        {
            string selectQuery = "Select * From ApproverDetailRequest Where ApproverId = @myId";
            List<Guid> myApproRequest = new List<Guid>();
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@myId", myId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            myApproRequest.Add((Guid)reader["DetailrequestId"]);
                        }
                    }
                }
            }

            List<PaymentRequestModel> paymentRequestList = new List<PaymentRequestModel>();
            foreach (Guid detailId in myApproRequest)
            {
                var PREntity = _context.PaymentRequests.SingleOrDefault(pr => pr.DetailRequestId.Equals(detailId));
                var paymentRequestModel = new PaymentRequestModel
                {
                    RequestCode = PREntity.RequestCode,
                    Purpose = PREntity.Purpose,
                    CreatedBy = _userRepository.GetFullNameById(PREntity.UserId),
                    CreatedDate = PREntity.CreateAt,
                    Status = _statusRepository.GetStatusById(PREntity.StatusId),
                };
                paymentRequestList.Add(paymentRequestModel);
            }
            return Ok(paymentRequestList);
        }

        [HttpGet("SendToOthers")]
        public IActionResult GetSendToOthersRequest(Guid myId)
        {

            var paymentRequestList = _context.PaymentRequests.Where(pr => pr.UserId.Equals(myId)).ToList().Select(PREntity => new PaymentRequestModel
            {
                RequestCode = PREntity.RequestCode,
                Purpose = PREntity.Purpose,
                CreatedBy = _userRepository.GetFullNameById(PREntity.UserId),
                CreatedDate = PREntity.CreateAt,
                Status = _statusRepository.GetStatusById(PREntity.StatusId),
            });
            return Ok(paymentRequestList.ToList());
        }


    }
}
