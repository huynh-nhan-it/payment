namespace PaymentModule.Repository
{
    public interface ICurrencyRepository
    {
        public Guid? GetIdByCurrency(string currency);
    }
}
