using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;

namespace PaymentModule.Repository
{
    public class CurrencyRepository : ICurrencyRepository
    {
        private PaymentContext _context;

        public CurrencyRepository(PaymentContext context)
        {
            _context = context;
        }
        Guid? ICurrencyRepository.GetIdByCurrency(string currency)
        {
            var curr= _context.Currencies.FirstOrDefault(cu => cu.Name.Contains(currency) == true);
            if (curr != null)
            {
                return curr.Id;
            }
            return null;
        }
    }
}
