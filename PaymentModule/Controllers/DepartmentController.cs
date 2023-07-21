using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Repository;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private PaymentContext _context;
        private IDepartmentRepository _departmentRepository;
        private IUserRepository _userRepository;
        private readonly ConnectionStringSettings _connectionStringSettings;
        public DepartmentController(PaymentContext paymentContext, 
            IDepartmentRepository departmentRepository,
            IUserRepository userRepository,
            ConnectionStringSettings connectionStringSettings) {
            _context = paymentContext;
            _departmentRepository = departmentRepository;
            _userRepository = userRepository;
            _connectionStringSettings = connectionStringSettings;
        }


        [HttpGet("department-name")] 
        public IActionResult GetDepartmentByName(string DepartmentName) {
            //B1: Kiểm tra trong db có department đó hay không (tìm tương đối)
            var departmentEntity = _departmentRepository.CheckExistDepartmentByName(DepartmentName);
            if (departmentEntity != null)
            {
                Guid DepartmentId = departmentEntity.Id; //lấy id của department đó
                var result = GetUserListOfDepartment(DepartmentId).Value as dynamic;
                var manager = result.manager;
                var supervisors = result.supervisors;
                var employees = result.employees;
                //tìm tất cả các user có trong department đó
                return Ok(new {departmentEntity.Name, departmentEntity.Description, departmentEntity.UnderDepartment, departmentEntity.Code, manager, supervisors, employees});
            } ;
            //B2: Lấy tên (chính xác) department đó từ database, và description, underdepartment, code
            //B3: lấy các list Manager, Supervisors, Employees
            //B4: Return Department Model
            return Ok("NOT FOUND");
        }

        private ObjectResult GetUserListOfDepartment(Guid DepartmentId)
        {
            ApproverModel manager = new ApproverModel();
            List<ApproverModel> supervisors = new List<ApproverModel>();
            List<ApproverModel> employees = new List<ApproverModel>();

            string selectQuery = "select * from DepartmentUser where DepartmentId = @DepartmentId";
            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@DepartmentId", DepartmentId);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            if (reader["Position"].Equals("Manager"))
                            {
                                manager = GetApproverById((Guid)reader["UserId"]);
                            } else if(reader["Position"].Equals("Supervisor"))
                            {
                                supervisors.Add(GetApproverById((Guid)reader["UserId"]));
                            } else if(reader["Position"].Equals("Employee"))
                            {
                                employees.Add(GetApproverById((Guid)reader["UserId"]));
                            }
                        }
                    }
                }
            }
            return new ObjectResult(new { manager , supervisors, employees });
        }

        private ApproverModel GetApproverById(Guid ApproverId)
        {
            var user = _context.Users.SingleOrDefault(u => u.Id.Equals(ApproverId));
            if(user != null)
            {
                var approverModel = new ApproverModel
                {
                    Id = user.Id,
                    FullName = _userRepository.GetFullNameById(user.Id),    
                    Email = _userRepository.GetEmailById(user.Id),
                    JobTitle = _userRepository.GetJobTitleById(user.Id),
                };
                return approverModel;
            } else
            {
                return new ApproverModel();
            }
        }

        [HttpPost]
        public IActionResult AddDepartment(DepartmentDto request)
        {
            Guid theID = Guid.NewGuid();
            var departmentEntity = new DepartmentEntity
            {
                Id = theID,
                Name = request.DepartmentName,
                Description = request.Description,
                UnderDepartment = request.UnderDepartment,
                Contact = request.Contact,
                Code = request.Code,
            };
            _context.Add(departmentEntity);
            _context.SaveChanges();
            //insert manager 
            InsertMember(theID, request.Manager, "Manager");
            //insert list supervisor
            if(request.Supervisors != null)
            {
                foreach (var approver in request.Supervisors)
                {
                    InsertMember(theID, approver, "Supervisor");
                }
            }

            //insert list employees
            if (request.Employees != null)
            {
                foreach (var approver in request.Employees)
                {
                    InsertMember(theID, approver, "Employee");
                }
            }
                
            return Ok();
        }
        
        private void InsertMember(Guid DepartmentId, ApproverDto request, string Position)
        {
            var userId = _userRepository.GetIdByEmail(request.Email);
            string insertQuery = "insert into DepartmentUser(DepartmentId, UserId, Position) values (@DepartmentId, @UserId, @Position)";

            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                    command.Parameters.AddWithValue("@DepartmentId", DepartmentId);
                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@Position", Position);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        [HttpPost("insert-member")]
        public IActionResult AddMember(ApproverDto approver, string DepartmentName, string Position)
        {
            Guid departmentId = (Guid) _departmentRepository.GetIdByDepartmentName(DepartmentName);
            InsertMember(departmentId, approver, Position);
            return Ok();
        }
    
    }
}
