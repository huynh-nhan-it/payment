
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using System.Data;

namespace EFPatrick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private PaymentContext _context;
        public RoleController(PaymentContext paymentContext) {
            _context = paymentContext;
        }

        [HttpPost]
        public IActionResult Insert(RoleDto role)
        {
            var roleEntity = new RoleEntity
            {
                Role = role.Role,
            };
            _context.Roles.Add(roleEntity);
            _context.SaveChanges();
            return Ok();
        }
    }
}
