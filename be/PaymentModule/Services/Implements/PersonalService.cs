using Microsoft.AspNetCore.Mvc;
using PaymentModule.Services.IServices;
using System.Drawing;
using System.Drawing.Imaging;

namespace PaymentModule.Services.Implements
{
    public class PersonalService : IPersonalService
    {


        async Task<ObjectResult> IPersonalService.HandleFile(IFormFile file, Guid userId, string type)
        {
            ObjectResult result = new ObjectResult(new { });
            string fileNamePath;
            string directoryPath;

            if (file == null)
            {
                result.Value = new { success = true, error = false, fileNamePath = "" };
                return result;
            }

            if (!file.ContentType.StartsWith("image/"))
            {
                result.Value = new { success = false, error = true, message = "Tệp tin không phải là ảnh." };
                return result;
            }

            // Kiểm tra kích thước tệp tin
            if (file.Length > 20 * 1024 * 1024) // 20MB
            {
                result.Value = new { success = false, error = true, message = "Kích thước tệp tin vượt quá giới hạn cho phép (20MB)." };
                return result;
            }
            try
            {
                switch (type)
                {
                    case "Avatar":
                        directoryPath = Path.Combine("wwwroot/image/avatar", userId.ToString());
                        if (Directory.Exists(directoryPath)) {
                            Directory.Delete(directoryPath, true);
                        }
                        Directory.CreateDirectory(directoryPath);
                        fileNamePath = Path.Combine(directoryPath, file.FileName);
                        using (var fileStream = new FileStream(fileNamePath, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }
                        result.Value = new { success = true, error = false, fileNamePath = fileNamePath.Replace("\\", "/") };
                        break;

                    case "Signature":
                        directoryPath = Path.Combine("wwwroot/image/signature", userId.ToString());
                        if (Directory.Exists(directoryPath)) { Directory.Delete(directoryPath, true); }
                        Directory.CreateDirectory(directoryPath);
                        fileNamePath = Path.Combine(directoryPath, file.FileName);
                        using (var fileStream = new FileStream(fileNamePath, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }
                        result.Value = new { success = true, error = false, fileNamePath = fileNamePath.Replace("\\", "/") };
                        break;
                    default:
                        result.Value = new { success = false, error = true, message = "Không thể định dạng kiểu hỗ trợ" };
                        break;
                }
                return result;
            }
            catch (Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message });
            }
        }
    }
}
