using Microsoft.AspNetCore.Mvc;

namespace PaymentModule.Service
{
    public interface IFileService
    {
        public Task<ObjectResult> HandleFile(IFormFileCollection files, Guid Id);
    }
}
