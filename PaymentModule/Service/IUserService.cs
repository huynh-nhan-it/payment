using Microsoft.AspNetCore.Mvc;

namespace PaymentModule.Service
{
    public interface IUserService
    {
        public Task<ObjectResult> HandleFile(IFormFileCollection files, Guid Id);
        public string GetRequestCode(string requestCode);

        public string DecodeToken(string token, string secretKey);
    }
}
