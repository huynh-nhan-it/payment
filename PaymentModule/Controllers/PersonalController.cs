using Microsoft.AspNetCore.Mvc;
using PaymentModule.Service;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public IUserService _userService;
        public PaymentContext _context;


        public PersonalController(PaymentContext paymentContext, IUserService userService,
            IConfiguration configuration)
        {
            _context = paymentContext;
            _configuration = configuration;
            _userService = userService;
        }

        [HttpGet("EmployeeInfo")]

        public IActionResult GetInforEmployee()
        {
            string token = "";
            var userId = "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9";
            string authorizationHeader = Request.Headers["Authorization"];
            var options = new JsonSerializerOptions { WriteIndented = true, ReferenceHandler = ReferenceHandler.Preserve };


            /*if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                string secretKey = _configuration["AppSettings:Token"];
                token = authorizationHeader.Substring("Bearer ".Length);
                userId = _userService.DecodeToken(token, secretKey);
                if (userId == "") { return BadRequest(new ObjectResult(new { success = false, error = true, message = "Process get token has error" })); }
            }
            else { return BadRequest(new { success = false, error = true, message = "Token not found in header" }); }*/
            var userWithDetails = _context.Users
                    .Include(u => u.Overview)
                    .Include(u => u.Additional)
                    .Include(u => u.Family)
                    .Include(u => u.Signature)
                    .Include(u => u.Additional.contracts)
                    .Include(u => u.Family.relationships)
                    .FirstOrDefault(u => u.Id.ToString() == userId);

            if (userWithDetails == null)
            {
                return BadRequest("User was not found");
            }

            var InfoUser = JsonSerializer.Serialize(new { userInfo = userWithDetails }, options);


            return Ok(InfoUser);
        }

        [HttpPut("EditInfoEmployee")]

        public IActionResult UpdateInfoEmployee([FromForm] PersonalDto personal)
        {
            IFormFile Avatar = personal.Avatar;
            string EmployeeNumber = personal.overview.Rank;
            string EmployeeType = personal.overview.EmployeeType;
            string Nation = personal.additional.Nation;
            string Phone = personal.additional.Phone;
            return Ok();
        }

    }
}
