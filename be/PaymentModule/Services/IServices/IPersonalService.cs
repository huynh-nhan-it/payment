using Microsoft.AspNetCore.Mvc;

namespace PaymentModule.Services.IServices
{
    public interface IPersonalService
    {
        public Task<ObjectResult> HandleFile(IFormFile file, Guid userId, string type);
    }
}
