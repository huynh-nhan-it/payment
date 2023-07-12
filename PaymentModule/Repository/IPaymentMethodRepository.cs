namespace PaymentModule.Repository
{
    public interface IPaymentMethodRepository
    {
        public Guid? GetIdByMethod(string method);
    }
}
