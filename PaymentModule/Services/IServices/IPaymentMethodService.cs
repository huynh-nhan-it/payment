namespace PaymentModule.Services.IServices
{
    public interface IPaymentMethodService
    {
        public Guid? GetIdByMethod(string method);
        public string GetPaymentMethodById(Guid id);
    }
}
