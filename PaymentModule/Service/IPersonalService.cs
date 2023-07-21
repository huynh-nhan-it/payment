using Microsoft.AspNetCore.Mvc;

namespace PaymentModule.Service
{
    public interface IPersonalService
    {
        public Task<ObjectResult> HandleFile(IFormFile file, Guid userId, string type);
    }
}
