/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Repository;
using System.Data.SqlClient;


namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailTableController : ControllerBase
    {
        private PaymentContext _context;
        private IDepartmentRepository _departmentRepository;

        public DetailTableController(PaymentContext paymentContext, IDepartmentRepository departmentRepository) {
            _context = paymentContext;
            _departmentRepository = departmentRepository;
        }  
        [HttpPost] 
        public IActionResult InsertTable(IList<DetailTableDto> Table)
        {
            foreach (DetailTableDto colunm in Table)
            {
                var detailTableEntity = new DetailTableEntity
                {
                    InvDate = colunm.InvDate,
                    PaymentContent = colunm.PaymentContent,
                    Amount = colunm.Amount,
                    InvNo = colunm.InvNo,
                    Industry = colunm.Industry,
                    DepartmentTableId = (Guid) _departmentRepository.GetIdByDepartmentName(colunm.DepartmentBear),
                    Note = colunm.Note,
                };
                _context.DetailTables.Add(detailTableEntity);
                

            }
            _context.SaveChanges();
            return Ok();
        }
    }
}
*/