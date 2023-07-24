using PaymentModule.Context;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private PaymentContext _context;
        public PaymentMethodService(PaymentContext context)
        {
            _context = context;
        }

        string IPaymentMethodService.GetPaymentMethodById(Guid id)
        {
            var department = _context.PaymentMethods.FirstOrDefault(de => de.Id.Equals(id) == true);
            if (department != null)
            {
                return department.Name;
            }
            return "";
        }

        Guid? IPaymentMethodService.GetIdByMethod(string methodName)
        {
            var method = _context.PaymentMethods.FirstOrDefault(m => m.Name.Contains(methodName) == true);

            if (method != null)
            {
                return method.Id;
            }
            return null;
        }
    }
}
