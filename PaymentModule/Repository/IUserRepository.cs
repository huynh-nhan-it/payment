namespace PaymentModule.Repository
{
    public interface IUserRepository
    {
        public string GetFullNameById(Guid id);
        public string GetJobTitleById(Guid id);
        public string GetEmailById(Guid id);
        public Guid? GetIdByEmail(string email);
        public Guid? GetIdByFullName(string creater);
        public string GetRoleById(string UserId);
    }
}
