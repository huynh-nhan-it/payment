using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class CurrencyService : ICurrencyService
    {
        private PaymentContext _context;

        public CurrencyService(PaymentContext context)
        {
            _context = context;
        }

        List<string> ICurrencyService.GetCurrencyList()
        {
            List<string> currModelList = new List<string>();
            var currEntiList = _context.Currencies.ToList();
            foreach( var currEnti in currEntiList )
            {      
                currModelList.Add(currEnti.Name);
            }
            return currModelList;
        }

        string ICurrencyService.GetCurrencyNameById(Guid id)
        {
            var department = _context.Currencies.FirstOrDefault(de => de.Id.Equals(id) == true);
            if (department != null)
            {
                return department.Name;
            }
            return "";
        }

        Guid? ICurrencyService.GetIdByCurrency(string currency)
        {
            var curr = _context.Currencies.FirstOrDefault(cu => cu.Name.Contains(currency) == true);
            if (curr != null)
            {
                return curr.Id;
            }
            return null;
        }
    }
}
