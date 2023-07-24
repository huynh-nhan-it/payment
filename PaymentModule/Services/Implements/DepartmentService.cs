using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class DepartmentService : IDepartmentService
    {
        private PaymentContext _context;
        private static ConnectionStringSettings _connectionStringSetting;
        private IUserService _userService;

        public DepartmentService() { }
        public DepartmentService(PaymentContext context, ConnectionStringSettings connectionStringSetting, IUserService userService)
        {
            _context = context;
            _connectionStringSetting = connectionStringSetting;
            _userService = userService;
        }

        DepartmentEntity IDepartmentService.CheckExistDepartmentByName(string departmentName)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName) == true);
            if (department != null)
            {
                return department;
            }
            return null;
        }

        DepartmentModel IDepartmentService.GetDepartmentModel(string departmentName)
        {
            var departmentEnti = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName));
            if(departmentEnti != null)
            {
                var objUsers = GetUserListOfDepartment(departmentEnti.Id).Value as dynamic;
                var departmentModel = new DepartmentModel
                {
                    DepartmentName = departmentEnti.Name,
                    Description = departmentEnti.Description,
                    UnderDepartment = departmentEnti.UnderDepartment,
                    Contact = departmentEnti.Contact,
                    Code = departmentEnti.Code,
                    Manager = objUsers.manager,
                    Supervisors = objUsers.supervisors,
                    Employees = objUsers.employees
                };
                return departmentModel;
            }
            return new DepartmentModel();
        }

        Guid IDepartmentService.GetIdByDepartmentName(string departmentName)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName) == true);
            if (department != null)
            {
                return department.Id;
            }
            return new Guid();
        }

        string IDepartmentService.GetNameByDepartmentId(Guid id)
        {
            var department = _context.Departments.FirstOrDefault(de => de.Id.Equals(id) == true);
            if (department != null)
            {
                return department.Name;
            }
            return "";
        }


        private ObjectResult GetUserListOfDepartment(Guid DepartmentId)
        {
            ApproverModel manager = new ApproverModel();
            List<ApproverModel> supervisors = new List<ApproverModel>();
            List<ApproverModel> employees = new List<ApproverModel>();

            string selectQuery = "select * from DepartmentUser where DepartmentId = @DepartmentId";
            using (SqlConnection connection = new SqlConnection(_connectionStringSetting.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@DepartmentId", DepartmentId);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var approver = _userService.GetApproverById((Guid)reader["UserId"]); 
                            if (reader["Position"].Equals("Manager"))
                            {
                                manager = approver;
                            }
                            else if (reader["Position"].Equals("Supervisor"))
                            {
                                supervisors.Add(approver);
                            }
                            else if (reader["Position"].Equals("Employee"))
                            {
                                employees.Add(approver);
                            }
                        }
                    }
                }
            }
            return new ObjectResult(new { manager, supervisors, employees });
        }

        List<DepartmentModel> IDepartmentService.GetDepartmentModelList()
        {
            var departmentEntityList = _context.Departments.ToList();
            List<DepartmentModel> DepartmentModelList = new List<DepartmentModel>();

            foreach (var departmentEnti in departmentEntityList)
            {
                var objUsers = GetUserListOfDepartment(departmentEnti.Id).Value as dynamic;
                var departmentModel = new DepartmentModel
                {
                    DepartmentName = departmentEnti.Name,
                    Description = departmentEnti.Description,
                    UnderDepartment = departmentEnti.UnderDepartment,
                    Contact = departmentEnti.Contact,
                    Code = departmentEnti.Code,
                    Manager = objUsers.manager,
                    Supervisors = objUsers.supervisors,
                    Employees = objUsers.employees
                };
                DepartmentModelList.Add(departmentModel);
            }
            return DepartmentModelList;
        }

        void IDepartmentService.AddMemberIntoDepartment(Guid DepartmentId, Guid UserId, string Position)
        {
            string insertQuery = "insert into DepartmentUser(DepartmentId, UserId, Position) values (@DepartmentId, @UserId, @Position)";

            using (SqlConnection connection = new SqlConnection(_connectionStringSetting.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                    command.Parameters.AddWithValue("@DepartmentId", DepartmentId);
                    command.Parameters.AddWithValue("@UserId", UserId);
                    command.Parameters.AddWithValue("@Position", Position);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        void IDepartmentService.AddDepartment(DepartmentDto request)
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

            IDepartmentService departmentService = new DepartmentService();


            Guid managerId = _userService.GetId(request.Manager.Email);
            departmentService.AddMemberIntoDepartment(theID, managerId, "Manager");
            //insert list supervisor
            if (request.Supervisors != null)
            {
                foreach (var approver in request.Supervisors)
                {
                    departmentService.AddMemberIntoDepartment(theID, _userService.GetId(approver.Email), "Supervisor");
                }
            }
            //insert list employees
            if (request.Employees != null)
            {
                foreach (var approver in request.Employees)
                {
                    departmentService.AddMemberIntoDepartment(theID, _userService.GetId(approver.Email), "Employee");
                }
            }
        }
    }
}
