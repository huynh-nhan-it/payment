using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Dynamic;
using PaymentModule.Service;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<UserModel> users = new List<UserModel>();
        public static List<AccountModel> accounts = new List<AccountModel>();
        private readonly IFileService _fileService;
        private PaymentContext _context;

        public UserController(PaymentContext paymentContext)
        {
            _context = paymentContext;
            _fileService = new FileService();
        }

        [HttpPost("handleFiles")]
        public async Task<IActionResult> handleFile([FromForm] IFormFileCollection files, Guid Id)
        {
            var result = await _fileService.HandleFile(files, Id);
            var data = result.Value as dynamic;
            if (data.Success)
            {
                return Ok(data.data);
            }
            return BadRequest(data.Message);

        }

        
        [HttpPost("create-request")]
        public IActionResult createRequest([FromBody] DetailRequestEntity detailRequestEntity)
        {

            
            return Ok();


            /*IFormFileCollection files = detailRequestEnity.Attachments;
            var resultProcessFile = handleFile(files, detailRequestEnity.Id);
            object attachments = null;

            if (resultProcessFile is OkObjectResult okResult)
            {
                var responseData = okResult.Value;
                attachments = responseData as ICollection<AttachmentEntity>;
            }
            else
            {
                return resultProcessFile;
            }
            
            return Ok(attachments);*/
        }
    }
}
