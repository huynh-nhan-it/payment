using Microsoft.AspNetCore.Mvc;

namespace PaymentModule.Services.IServices
{
    public interface IPaymentRequestService
    {
        public ObjectResult InsertpaymentRequest(Guid requestId, string userId, string type, string RequestCode, Guid paymentRequestId);

    }
}
