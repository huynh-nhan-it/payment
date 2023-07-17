using PaymentModule.Entities;

namespace PaymentModule.Repository
{
    public interface IAccountRepository
    {
        public string GetMyAccount();
        public string GetUserIdByAccountId(Guid accountId);

        public AccountEntity CheckExist(string Email);
    }
}
