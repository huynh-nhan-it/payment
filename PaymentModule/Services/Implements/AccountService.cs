using PaymentModule.Context;
using PaymentModule.Entities;
using PaymentModule.Services.IServices;
using System.Security.Claims;

namespace PaymentModule.Services.Implements
{
    public class AccountService : IAccountService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly PaymentContext _context;
        public AccountService(IHttpContextAccessor httpContextAccessor, PaymentContext paymentContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = paymentContext;
        }
        public string GetMyAccount()
        {
            var myUserName = string.Empty;
            if (_httpContextAccessor != null)
            {
                myUserName = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return myUserName;
        }

        AccountEntity IAccountService.CheckExist(string Email)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.Email.CompareTo(Email) == 0);
            return account;
        }

        string IAccountService.GetMyAccount()
        {
            throw new NotImplementedException();
        }

        string IAccountService.GetUserIdByAccountId(Guid accountId)
        {
            throw new NotImplementedException();
        }
    }
}
