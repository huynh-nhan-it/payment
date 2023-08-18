using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }
        [HttpGet("supplier-name-list")]
        public IActionResult GetAllName() {
            try
            { 
                return Ok(_supplierService.GetSupplierList());
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
