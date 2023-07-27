using Microsoft.AspNetCore.Mvc;
using PaymentModule.Models;

namespace PaymentModule.Services.IServices
{
    public interface IPaymentRequestService
    {
        public ObjectResult InsertpaymentRequest(Guid requestId, string userId, string type, string RequestCode, Guid paymentRequestId);
        public PaymentRequestModel GetPaymentRequestModel(string RequestCode);
    }
}
