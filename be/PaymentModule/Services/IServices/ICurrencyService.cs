using PaymentModule.Models;

namespace PaymentModule.Services.IServices
{
    public interface ICurrencyService
    {
        public Guid GetIdByCurrency(string currency);
        public string GetCurrencyNameById(Guid id);

        public List<string> GetCurrencyList();
    }
}
