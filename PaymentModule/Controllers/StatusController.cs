/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Repository;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private IStatusRepository _statusRepository;

        public StatusController(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetStatusById(Guid id)
        {
            return Ok(_statusRepository.GetStatusById(id));
        }
    }
}
*/