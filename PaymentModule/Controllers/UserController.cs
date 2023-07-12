/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Entities;
=======
using Microsoft.Data.SqlClient;
using PaymentModule.DTOs;
using PaymentModule.Repository;
>>>>>>> origin/export-excel
using System;
using System.Collections.Generic;
using System.Data;
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

        private string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";
        private IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetName(Guid id)
        {
            string myName = _userRepository.GetFullNameById(id);
            return Ok(new { name = myName });
        }


        [HttpPost]
        public IActionResult AddApprover(List<ApproverDto> approvers)
        {
            foreach(ApproverDto approver in approvers)
            {

                string insertQuery = "INSERT INTO ApproverDetailRequest (ApproverId, DetailRequestId) VALUES (@ApproverId, @DetailRequestId)";

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(insertQuery, connection))
                    {
                        // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                        command.Parameters.AddWithValue("@DetailRequestId", new Guid("1BE6E7EA-E614-454B-DB18-08DB8299988C"));
                        command.Parameters.AddWithValue("@ApproverId", (Guid)_userRepository.GetIdByEmail(approver.Email));
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
            }
            return Ok();
        }
        

    }
}
*/