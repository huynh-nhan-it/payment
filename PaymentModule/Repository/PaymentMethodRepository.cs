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

        string IPaymentMethodRepository.GetPaymentMethodById(Guid id)
        {
            var department = _context.PaymentMethods.FirstOrDefault(de => de.Id.Equals(id) == true);
            if (department != null)
            {
                return department.Name;
            }
            return "";
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
