using PaymentModule.Entities;

namespace PaymentModule.Services.IServices
{
    public interface IAccountService
    {
        public string GetMyAccount();
        public string GetUserIdByAccountId(Guid accountId);

        public AccountEntity CheckExist(string Email);
    }
}
