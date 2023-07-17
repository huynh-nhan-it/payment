namespace PaymentModule.Repository
{
    public interface IPaymentMethodRepository
    {
        public Guid? GetIdByMethod(string method);
        public string GetPaymentMethodById(Guid id);
    }
}
