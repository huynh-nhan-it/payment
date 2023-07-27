﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.Implements;
using PaymentModule.Services.IServices;

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
                    paymentRequests = paymentRequests.Skip((int)(page - 1) * 1).Take(1);
                }
                var paymentRequestList = paymentRequests.ToList().Select(PREntity => new PaymentRequestModel
                {
                    RequestCode = PREntity.RequestCode,
                    Purpose = PREntity.Purpose,
                    CreatedBy = _userService.GetUserModelById(PREntity.UserId).FullName,
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
                    CreatedBy = _userService.GetUserModelById(paymentRequest.UserId).FullName,
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

        [HttpGet("SendToOthers")]
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
    }
}
