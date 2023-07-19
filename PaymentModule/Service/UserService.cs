using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic.FileIO;
using PaymentModule.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PaymentModule.Service
{
    public class UserService : IUserService
    {
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
            // Tạo số mới bằng cách cộng thêm 1 vào số hiện tại
            int newNumber = number + 1;

            // Tạo chuỗi mới với số mới và thêm các ký tự "0" vào đằng trước
            string newSixDigits = newNumber.ToString().PadLeft(6, '0');
            // Nối lại các phần tử trong mảng, thay phần tử cuối cùng bằng số mới
            parts[parts.Length - 1] = newSixDigits;
            string result = string.Join("-", parts);
            return result;
        }

        async Task<ObjectResult> IUserService.HandleFile(IFormFileCollection files, Guid Id)
        {

            ICollection<AttachmentEntity> attachments = new List<AttachmentEntity>();

            foreach (var file in files)
            {
                var result = await ProcessFileAsync(file, Id);
                var data = result.Value as dynamic;
                var filePath = Path.Combine("data", Id.ToString());
                var fileName = Path.Combine(filePath, file.FileName);
                if (data != null && data.Success != null && data.Success)
                {
                    AttachmentEntity attachment = new AttachmentEntity { 
                        Id = Guid.NewGuid(),
                        FilePath = fileName,
                        FileType = file.ContentType,
                        DetailRequestId = Id,
                    }; 
                    attachments.Add(attachment);
                   // Add the file name to the list of successfully saved files
                }
                else
                {
                    // Delete the previously saved files in directory;
                    System.IO.Directory.Delete(filePath, true);
                    return result; // Return the bad request result from ProcessFileAsync
                }
            }
            return new ObjectResult(new {data = attachments, Success = true, Error = false, Message = "Handle file success"});

        }



        private async Task<ObjectResult> ProcessFileAsync(IFormFile file, Guid Id)
        {
            var fileName = file.FileName;
            var fileLength = file.Length;
            const long maxFileSize = 20 * 1024 * 1024;
            var data = new { Success = true, Error = false, Message = "Process file success"};

            if (fileLength > maxFileSize)
            {
                var error = new { Error = true, Success = false, Message = "File size should not exceed 20MB" };
                return new ObjectResult(error) { StatusCode = 400 };
            }
            var directoryPath = Path.Combine("data", Id.ToString());
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
    }
}
