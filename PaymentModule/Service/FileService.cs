using Microsoft.AspNetCore.Mvc;
using PaymentModule.Entities;

namespace PaymentModule.Service
{
    public class FileService : IFileService
    {

        public async Task<ObjectResult> HandleFile(IFormFileCollection files, Guid Id)
        {

            ICollection<AttachmentEntity> attachments = new List<AttachmentEntity>();

            foreach (var file in files)
            {
                var result = await ProcessFileAsync(file, Id);
                var data = result.Value as dynamic;
                var filePath = Path.Combine("data", Id.ToString());
                if (data != null && data.Success != null && data.Success)
                {
                    AttachmentEntity attachment = new AttachmentEntity(
                        file.FileName, file.ContentType, Id
                    );
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
    }
}
