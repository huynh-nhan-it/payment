using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.Implements;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private PaymentContext _context;
        private IDepartmentService _departmentService;
        private IDepartmentBearService _departmentBearService;

        private IUserService _userService;
        private static ConnectionStringSettings _connectionStringSettings;
        public DepartmentController(PaymentContext paymentContext, 
            IDepartmentService departmentService,
            IDepartmentBearService departmentBearService,
            IUserService userService,
            ConnectionStringSettings connectionStringSettings) {
            _context = paymentContext;
            _departmentService = departmentService;
            _departmentBearService = departmentBearService;
            _userService = userService;
            _connectionStringSettings = connectionStringSettings;
        }


        [HttpGet("department-name")] 
        public IActionResult GetDepartmentByName(string DepartmentName) {
            try
            {
                var departmenModel = _departmentService.GetDepartmentModel(DepartmentName);
                if(departmenModel != null)
                {
                    return Ok(departmenModel);
                } else
                {
                    return NotFound();
                }
                
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("department-name-list")]
        public IActionResult GetDepartmentNameList()
        {
            try
            {
                var departmenList = _departmentService.GetDepartmentModelList();
                if (departmenList.Count != 0)
                {
                    var departmentNameList = new List<string>();
                    foreach(var departmentModel in departmenList)
                    {
                        departmentNameList.Add(departmentModel.DepartmentName);
                    }
                    return Ok(departmentNameList);
                }
                else
                {
                    return NotFound();
                }
                return Ok(_departmentService.GetDepartmentModelList());

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("department-bear-list")]
        public IActionResult GetAllDepartmentBearList()
        {
            try
            {
                return Ok(_departmentBearService.GetAllDepartmentBear());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost("add-department")]
        public IActionResult AddDepartment(DepartmentDto request)
        {
            try
            {
                _departmentService.AddDepartment(request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        
        
        [HttpPost("add-member")]
        public IActionResult AddMember(ApproverDto Approver, string DepartmentName, string Position)
        {
            try
            {
                var guidCheck = new Guid();
                var departmentId = _departmentService.GetIdByDepartmentName(DepartmentName);
                var userId = _userService.GetId(Approver.Email);
                if(departmentId.Equals(guidCheck) || userId.Equals(guidCheck) || !(Position == "Supervior" || Position == "Employee"))
                {
                    return BadRequest();
                }
                _departmentService.AddMemberIntoDepartment(departmentId, userId, Position);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
