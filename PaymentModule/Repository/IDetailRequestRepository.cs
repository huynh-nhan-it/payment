namespace PaymentModule.Repository
{
    public interface IDetailRequestRepository
    {
        public string GetPurposeById(Guid id);
    }
}
