/*
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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
        public RoleController(PaymentContext paymentContext)
        {
            _context = paymentContext;
        }
        public IActionResult Insert(RoleDto role)
        {
            string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";

            string insertQuery = "INSERT INTO ROlES (Id, Role) VALUES (@Id, @Role)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                    command.Parameters.AddWithValue("@Id", Guid.NewGuid());
                    command.Parameters.AddWithValue("@Role", role.Role);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
            return Ok();

        }

       
    }
}
*/