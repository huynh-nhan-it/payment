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
                myUserName = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Version);
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
            var myUserName = string.Empty;
            if (_httpContextAccessor != null)
            {
                myUserName = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Version);
            }
            return myUserName;
        }
        Claim IAccountService.UpdateClaimVersion()
        {
            var newVersion = "2.0"; // Giá trị version mới bạn muốn đặt
            var myClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Version);

            if (myClaim != null)
            {
                // Xóa claim cũ nếu muốn thay thế hoàn toàn
                ((ClaimsIdentity)_httpContextAccessor.HttpContext.User.Identity).RemoveClaim(myClaim);

                // Thêm claim mới với giá trị version mới
                ((ClaimsIdentity)_httpContextAccessor.HttpContext.User.Identity).AddClaim(new Claim(ClaimTypes.Version, newVersion));
            }
            return myClaim;
        }
        string IAccountService.GetUserIdByAccountId(Guid accountId)
        {
            throw new NotImplementedException();
        }
    }
}
