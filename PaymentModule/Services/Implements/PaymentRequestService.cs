using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class PaymentRequestService : IPaymentRequestService
    {
        private PaymentContext _context;
        private IUserService _userService;
        private IDetailRequestService _detailRequestService;
        public PaymentRequestService( PaymentContext context, IUserService userService, IDetailRequestService detailRequestService)
        {
            _context = context;
            _userService = userService;
            _detailRequestService = detailRequestService;
        }   
        ObjectResult IPaymentRequestService.InsertpaymentRequest(Guid requestId, string userId)
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
                    Purpose = _detailRequestService.GetPurposeById(requestId),
                    StatusId = new Guid("80BCF31A-08AA-433D-879D-AB55E7730045"), //Approving
                    UserId = new Guid(string.IsNullOrEmpty(userId) ? "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9" : userId), //Testing...
                    CreateAt = DateTime.Now,
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
