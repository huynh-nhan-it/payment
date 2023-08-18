using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApproverController : ControllerBase
    {

        private PaymentContext _context;
        private IUserService _userService;
        public ApproverController(PaymentContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }
        [HttpGet]
        public IActionResult GetAllApprover(Guid myId)
        {
            try { 
                return Ok(_userService.GetAllApprover(myId));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       

    }
}
