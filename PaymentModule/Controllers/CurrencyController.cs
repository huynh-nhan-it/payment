using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private ICurrencyService _currencyService;
        public CurrencyController(ICurrencyService currencyService)
        {
            _currencyService = currencyService;
        }
        [HttpGet("currency-list")]
        public IActionResult GetALlCurrency()
        {
            try
            {
                return Ok(_currencyService.GetCurrencyList());
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
