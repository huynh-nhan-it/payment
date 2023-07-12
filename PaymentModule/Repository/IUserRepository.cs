namespace PaymentModule.Repository
{
    public interface IUserRepository
    {
        public string GetFullNameById(Guid id);
        public Guid? GetIdByEmail(string email);
    }
}
