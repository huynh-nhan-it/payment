using System.Security.Claims;

namespace PaymentModule.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AccountRepository(IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
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
    }
}
