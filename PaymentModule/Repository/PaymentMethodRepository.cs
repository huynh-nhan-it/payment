using PaymentModule.Context;

namespace PaymentModule.Repository
{
    public class PaymentMethodRepository : IPaymentMethodRepository
    {
        private PaymentContext _context;
        public PaymentMethodRepository(PaymentContext context)
        {
            _context = context;
        }
        Guid? IPaymentMethodRepository.GetIdByMethod(string methodName)
        {
            var method = _context.PaymentMethods.FirstOrDefault(m => m.Name.Contains(methodName) == true);

            if(method != null)
            {
                return method.Id;
            }
            return null;
        }
    }
}
