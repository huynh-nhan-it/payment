using Microsoft.AspNetCore.Mvc;

namespace PaymentModule.Service
{
    public interface IFileService
    {
        Task<ObjectResult> HandleFile(IFormFileCollection files, Guid Id);
    }
}
