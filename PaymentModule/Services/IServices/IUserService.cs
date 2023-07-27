using Microsoft.AspNetCore.Mvc;
using PaymentModule.Models;

namespace PaymentModule.Services.IServices
{
    public interface IUserService
    {
        public Guid GetId(string prop);
        public UserModel GetUserModelById(Guid id);
        public Task<ObjectResult> HandleFile(IFormFileCollection files, Guid Id);
        public string GetRequestCode(string requestCode);
        public string DecodeToken(string token, string secretKey);
        public List<ApproverModel> GetAllApprover(Guid myId);
        public ApproverModel GetApproverById(Guid id);
        public bool CheckExistByEmail(string email);
    }
}
