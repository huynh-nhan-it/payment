using PaymentModule.Context;
using PaymentModule.Entities;
using System.Security.Claims;

namespace PaymentModule.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly PaymentContext _context;
        public AccountRepository(IHttpContextAccessor httpContextAccessor, PaymentContext paymentContext) {
            _httpContextAccessor = httpContextAccessor;
            _context = paymentContext;
        }  
        public string GetMyAccount()
        {
            var myUserName = string.Empty;
            if(_httpContextAccessor != null)
            {
                myUserName = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return myUserName;
        }

        AccountEntity IAccountRepository.CheckExist(string Email)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.Email.CompareTo(Email) == 0);
            return account;
        }

        string IAccountRepository.GetMyAccount()
        {
            throw new NotImplementedException();
        }

        string IAccountRepository.GetUserIdByAccountId(Guid accountId)
        {
            throw new NotImplementedException();
        }
    }
}
