using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using PaymentModule.Context;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PaymentModule.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly PaymentContext _context;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public UserService(PaymentContext context, ConnectionStringSettings connectionStringSettings)
        {
            _context = context;
            _connectionStringSettings = connectionStringSettings;
        }
        public UserService() { }
        UserModel IUserService.GetUserModelById(Guid id)
        {
            UserEntity UserEnti = _context.Users.SingleOrDefault(u => u.Id.Equals(id) == true);
            if(UserEnti != null)
            {
                UserModel userModel = new UserModel
                {
                    FullName = UserEnti.FirstName + " " + UserEnti.LastName,
                    Email = UserEnti.Email,
                    PhoneNumber = UserEnti.PhoneNumber,
                    Avatar = UserEnti.Avatar,
                    JobTitle = UserEnti.JobTitle
                };
                return userModel;
            }
            return new UserModel();
        }
        Guid IUserService.GetId(string prop) //testing...
        {
            Guid theId = new Guid();
               var user = _context.Users.FirstOrDefault(u => (u.FirstName + " " + u.LastName).Contains(prop) || u.Email == prop);
               if (user != null)
                {
                    theId = user.Id;
                }
            return theId;
        }
        string IUserService.GetRequestCode(string inputString)
        {
            string[] parts = inputString.Split('-');
            string lastPart = parts[parts.Length - 1];
            if (int.TryParse(lastPart, out int requestCode))
            {
                return GetPaddedSixDigitString(requestCode, parts);

            }
            return "";
        }
        private string GetPaddedSixDigitString(int number, string[] parts)
        {
            int newNumber = number + 1;
            string newSixDigits = newNumber.ToString().PadLeft(6, '0');
            parts[parts.Length - 1] = newSixDigits;
            string result = string.Join("-", parts);
            return result;
        }
        async Task<ObjectResult> IUserService.HandleFile(IFormFileCollection files, Guid Id)
        {
            ICollection<AttachmentEntity> attachments = new List<AttachmentEntity>();
            if(files == null)
            {
                return new ObjectResult(new { data = attachments, Success = true, Error = false, Message = "Handle file success" });

            }
            foreach (var file in files)
            {
                var result = await ProcessFileAsync(file, Id);
                var data = result.Value as dynamic;
                var filePath = Path.Combine("data/request", Id.ToString());
                var fileName = Path.Combine(filePath, file.FileName);
                if (data != null && data.Success != null && data.Success)
                {
                    AttachmentEntity attachment = new AttachmentEntity
                    {
                        Id = Guid.NewGuid(),
                        FilePath = fileName,
                        FileType = file.ContentType,
                        DetailRequestId = Id,
                    };
                    attachments.Add(attachment);
                }
                else
                {
                    Directory.Delete(filePath, true);
                    return result; // Return the bad request result from ProcessFileAsync
                }
            }
            return new ObjectResult(new { data = attachments, Success = true, Error = false, Message = "Handle file success" });

        }
        private async Task<ObjectResult> ProcessFileAsync(IFormFile file, Guid Id)
        {
            var fileName = file.FileName;
            var fileLength = file.Length;
            const long maxFileSize = 20 * 1024 * 1024;
            var data = new { Success = true, Error = false, Message = "Process file success" };

            if (fileLength > maxFileSize)
            {
                var error = new { Error = true, Success = false, Message = "File size should not exceed 20MB" };
                return new ObjectResult(error) { StatusCode = 400 };
            }
            var directoryPath = Path.Combine("data/request", Id.ToString());
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            var filePath = Path.Combine(directoryPath, fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return new ObjectResult(data);
        }
        string IUserService.DecodeToken(string token, string secretKey)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var claims = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true
                }, out var validatedToken);

                // Lấy thông tin claims từ token
                var userId = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                // Các xử lý khác ...

                return userId;
            }
            catch
            {
                // Xử lý lỗi nếu token không hợp lệ
                return "";
            }
        }
        List<ApproverModel> IUserService.GetAllApprover()
        {
            List<ApproverModel> approList = new List<ApproverModel>();
            var userList = _context.Users.ToList();
            foreach(var u in userList)
            {
                var approver = new ApproverModel
                {
                    FullName = u.FirstName + " " + u.LastName,
                    Email = u.Email,
                    JobTitle = u.JobTitle,
                };
                approList.Add(approver);
            }
            return approList;
        }
        ApproverModel IUserService.GetApproverById(Guid ApproverId)
        {
            var userEnti = _context.Users.SingleOrDefault(u => u.Id.Equals(ApproverId));
            if (userEnti != null)
            {
                var approverModel = new ApproverModel
                {
                    FullName = userEnti.FirstName + " " + userEnti.LastName,
                    Email = userEnti.Email,
                    JobTitle = userEnti.JobTitle,
                };
                return approverModel;
            }
            else
            {
                return new ApproverModel();
            }
        }

        bool IUserService.CheckExistByEmail(string email)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email.Equals(email));
            if(user != null)
            {
                return true;
            }
            return false;
        }
    }
}
