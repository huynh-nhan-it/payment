using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class PaymentRequestService : IPaymentRequestService
    {
        private PaymentContext _context;
        private IUserService _userService;
        private IDetailRequestService _detailRequestService;
        private IStatusService _statusService;
        public PaymentRequestService( PaymentContext context, IUserService userService, IDetailRequestService detailRequestService, IStatusService statusService)
        {
            _context = context;
            _userService = userService;
            _detailRequestService = detailRequestService;
            _statusService = statusService;
        }

        PaymentRequestModel IPaymentRequestService.GetPaymentRequestModel(string RequestCode)
        {
           var PaymentRequestEnti = _context.PaymentRequests.FirstOrDefault(pr => pr.RequestCode.Equals(RequestCode));
           if(PaymentRequestEnti != null)
            {
                PaymentRequestModel prm = new PaymentRequestModel
                {
                    RequestCode = PaymentRequestEnti.RequestCode,
                    Purpose = PaymentRequestEnti.Purpose,
                    CreatedBy = _userService.GetUserModelById(PaymentRequestEnti.UserId).FullName,
                    CreatedDate = PaymentRequestEnti.CreateAt,
                    Status = _statusService.GetStatusById(PaymentRequestEnti.StatusId),
                };
                return prm;
            }
            return new PaymentRequestModel();
        }

        ObjectResult IPaymentRequestService.InsertpaymentRequest(Guid requestId, string userId, string type, string RequestCode, Guid paymentRequestId)
        {
            try
            {
                string resultRequestCode = RequestCode == "" ? "" : RequestCode;
                bool isDaft = type == "create-request" ? false : true;
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
                    Id = paymentRequestId,
                    RequestCode = resultRequestCode, //Testing...
                    Purpose = _detailRequestService.GetPurposeById(requestId),
                    StatusId = isDaft ? new Guid("D86CF51D-17FA-43BB-BFC5-369EE3034B35") : new Guid("80BCF31A-08AA-433D-879D-AB55E7730045") , //Approving
                    UserId = new Guid(string.IsNullOrEmpty(userId) ? "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9" : userId), //Testing...
                    CreateAt = DateTime.Now,
                    IsDeleted = 1,
                    DetailRequestId = requestId
                };

                _context.PaymentRequests.Add(paymentRequest);
                _context.SaveChanges();

                var CmtDto = new CommentDto
                {
                    UserId = new Guid(string.IsNullOrEmpty(userId) ? "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9" : userId),
                    DetailRequestId = requestId,
                    Content = "Submit the request " + resultRequestCode + " for approval",
                    CreatedAt = DateTime.Now,
                };
                _detailRequestService.PostComment(CmtDto);
                return new ObjectResult(new { success = true, error = false, message = "Insert payment request success" });
            }
            catch (Exception ex)
            {
                return new ObjectResult(new { success = false, error = true, message = ex.ToString() });
            }
        }
    }
    
}
