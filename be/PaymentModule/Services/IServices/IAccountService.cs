using PaymentModule.Entities;
using System.Security.Claims;

namespace PaymentModule.Services.IServices
{
    public interface IAccountService
    {
        public string GetMyAccount();
        public string GetUserIdByAccountId(Guid accountId);
        public AccountEntity CheckExist(string Email);
        public Claim UpdateClaimVersion();
    }
}
