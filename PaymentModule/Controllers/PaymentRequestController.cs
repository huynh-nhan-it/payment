using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.Implements;
using PaymentModule.Services.IServices;
using PdfSharpCore;
using SixLabors.ImageSharp;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentRequestController : ControllerBase
    {
        private readonly PaymentContext _context;
        private readonly IStatusService _statusRepository;
        private readonly IUserService _userService;
        private readonly IPaymentRequestService _paymentRequestService;
        private readonly ConnectionStringSettings _connectionStringSettings;
        private int page_size = 4;

        public PaymentRequestController(PaymentContext paymentContext, IStatusService statusRepository, IUserService userRepository, ConnectionStringSettings connectionStringSettings, IPaymentRequestService paymentRequestService)
        {
            _statusRepository = statusRepository;
            _userService = userRepository;
            _context = paymentContext;
            _connectionStringSettings = connectionStringSettings;
            _paymentRequestService = paymentRequestService;
        }

        [HttpGet]
        public IActionResult GetPaymentRequests(string? Purpose, string? RequestCode, DateTime? from, DateTime? to, string? Creater, string? Status, int? page)
        {
            try
            {
                var paymentRequests = _context.PaymentRequests.AsQueryable();

                if(!string.IsNullOrEmpty(Purpose))
                {
                    paymentRequests = paymentRequests.Where(paymentRequest =>  paymentRequest.Purpose.Contains(Purpose) && paymentRequest.IsDeleted == 1);
                }

                if(!string.IsNullOrEmpty(RequestCode))
                {
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.RequestCode.Contains(RequestCode) && paymentRequest.IsDeleted == 1);
                }

                if (!string.IsNullOrEmpty(Creater))
                {
                    Guid CreaterId = _userService.GetId(Creater);
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.UserId.Equals(CreaterId) && paymentRequest.IsDeleted == 1);
                }

                if (!string.IsNullOrEmpty(Status))
                {
                    Guid statusId = _statusRepository.GetIdByStatus(Status);
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.StatusId.Equals(statusId) && paymentRequest.IsDeleted == 1);
                }

                if (from.HasValue)
                {
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.CreateAt >= from.Value && paymentRequest.IsDeleted == 1);
                }

                if (to.HasValue)
                {
                    DateTime toDate = to.Value.AddDays(1);
                    paymentRequests = paymentRequests.Where(paymentRequest => paymentRequest.CreateAt < toDate && paymentRequest.IsDeleted == 1);
                }
                if(page.HasValue)
                {
                    paymentRequests = paymentRequests.Skip((int)(page - 1) * page_size).Take(page_size);
                }
                var paymentRequestList = paymentRequests.ToList().Where(PREntity => PREntity.IsDeleted == 1).Select(PREntity => new PaymentRequestModel
                {
                    RequestCode = PREntity.RequestCode,
                    Purpose = PREntity.Purpose,
                    CreatedBy = _userService.GetUserModelById(PREntity.UserId).FullName,
                    CreatedDate = PREntity.CreateAt,
                    Status = _statusRepository.GetStatusById(PREntity.StatusId),
                }).OrderByDescending(p => p.RequestCode);
                return Ok(paymentRequestList.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("generate-excel")]
        public async Task<IActionResult> GenerateExcel()
        {
            List<PaymentRequestModel> PaymentRequestList = new List<PaymentRequestModel>();

            foreach (PaymentRequestEntity paymentRequest in _context.PaymentRequests.ToList())
            {
                PaymentRequestModel request = new PaymentRequestModel
                {
                    RequestCode = paymentRequest.RequestCode,
                    Purpose = paymentRequest.Purpose,
                    CreatedBy = _userService.GetUserModelById(paymentRequest.UserId).FullName,
                    CreatedDate = paymentRequest.CreateAt,
                    Status = _statusRepository.GetStatusById(paymentRequest.StatusId),
                };
                PaymentRequestList.Add(request);
            }

            string emailtemplatepath = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExportTemplate//ExportExcel.html");
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

        [HttpGet("send-to-me")]
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
                var PREntity = _context.PaymentRequests.SingleOrDefault(pr => pr.DetailRequestId.Equals(detailId) && pr.IsDeleted == 1);
                var paymentRequestModel = new PaymentRequestModel
                {
                    RequestCode = PREntity.RequestCode,
                    Purpose = PREntity.Purpose,
                    CreatedBy = _userService.GetUserModelById(PREntity.UserId).FullName,
                    CreatedDate = PREntity.CreateAt,
                    Status = _statusRepository.GetStatusById(PREntity.StatusId),
                };
                paymentRequestList.Add(paymentRequestModel);
            }
            return Ok(paymentRequestList);
        }

        [HttpGet("send-to-others")]
        public IActionResult GetSendToOthersRequest(Guid myId)
        {
            var paymentRequestList = _context.PaymentRequests.Where(pr => pr.UserId.Equals(myId) && pr.IsDeleted == 1).ToList().Select(PREntity => new PaymentRequestModel
            {
                RequestCode = PREntity.RequestCode,
                Purpose = PREntity.Purpose,
                CreatedBy = _userService.GetUserModelById(PREntity.UserId).FullName,
                CreatedDate = PREntity.CreateAt,
                Status = _statusRepository.GetStatusById(PREntity.StatusId),
            });
            return Ok(paymentRequestList.ToList());
        }

        [HttpPost("shared-request")]
        public IActionResult SharedRequest(Guid SenderId, List<ApproverDto> ReceiverList, string RequestCode)
        {
            if (ReceiverList == null || ReceiverList.Count == 0)
            {
                return Ok("Receiver List Invalid");
            }
            else
            {
                foreach (ApproverDto receiver in ReceiverList)
                {
                    Guid receiverId = _userService.GetId(receiver.Email);
                    SharedPaymentEntity sharedPayment = new SharedPaymentEntity
                    {
                        SenderId = SenderId,
                        ReceiverId = receiverId,
                        PaymentRequestCode = RequestCode
                    };
                    _context.SharedPayments.Add(sharedPayment);
                    _context.SaveChanges();
                }
                return Ok();
            }
        }

        [HttpGet("shared-with-me")]
        public IActionResult GetSharedWithMeRequest(Guid myId)
        {
            List<PaymentRequestModel> paymentList = new List<PaymentRequestModel>();
            foreach (var sharedEnti in _context.SharedPayments.ToList())
            {
                if(sharedEnti.ReceiverId.Equals(myId))
                {
                    paymentList.Add(_paymentRequestService.GetPaymentRequestModel(sharedEnti.PaymentRequestCode));
                }
            }
            return Ok(paymentList);
        }
        
        [HttpGet("total-page")] 
        public IActionResult GetTotalPage()
        {
            try {
                double totalPage = 0d;
                if (_context.PaymentRequests.Count() % page_size == 0)
                {
                    totalPage = _context.PaymentRequests.Count() / page_size;
                } else
                {
                    totalPage = Math.Floor((_context.PaymentRequests.Count() / page_size) * 1.0d) + 1;
                }
                 
                return Ok(totalPage);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }


        private async Task<string> CheckRightsOfApprover(Guid ApproverId, Guid DetailRequestId)
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
                            string status = (string)reader["Status"];
                            return status;
                        }

                    }
                }
            }
            return "Trạng thái không phù hợp";
        }

        [HttpGet("Progress")]

        public async Task<IActionResult> getProgress(Guid DetailRequestId)
        {
            var detailRequest = await _context.DetailRequests.Include(d => d.Approvers).FirstOrDefaultAsync(d => d.Id.Equals(DetailRequestId));
            var requestEntity = await _context.PaymentRequests.FirstOrDefaultAsync(p => p.DetailRequestId.Equals(DetailRequestId));

            if (requestEntity != null)
            {

                var User = await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(requestEntity.UserId));
                var Progress = new List<ProgressModel>();
                var ListApprover = detailRequest.Approvers;
                Progress.Add(new ProgressModel
                {
                    FullName = User.FirstName + " " + User.LastName,
                    Email = User.Email,
                    JobTitle = User.JobTitle,
                    Avatar = User.Avatar,
                    Status = "Sender"
                });
                
                foreach(var item in ListApprover)
                {
                    var status = await CheckRightsOfApprover(item.Id, detailRequest.Id);
                    Progress.Add(new ProgressModel
                    {
                        FullName = item.FirstName + " " + item.LastName,
                        Email = item.Email,
                        JobTitle = item.JobTitle,
                        Avatar = item.Avatar,
                        Status = status
                    }) ;
                }
                

                return Ok(new { success = true, error = false, message = "Progress đã được xác thực", data = Progress.ToList() });

            }
            return BadRequest(new { success = false, error = true, message = "Id không chính xác", data = ""});
        }
    }
}
