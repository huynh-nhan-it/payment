using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers_Draft
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidationTestingController : ControllerBase
    {
        public IValidation _validation;
        public ValidationTestingController(IValidation validation) {
            _validation = validation;
        }
        [HttpPost]
        public IActionResult CheckPassword(string s)
        {
            return Ok(_validation.CheckSpace(s));
        }
    }
}
