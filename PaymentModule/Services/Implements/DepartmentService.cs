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
        private List<string> positions = new List<string> { "Manager", "Supervisor", "Employee" };


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
                if(department.IsDeleted == 1)
                {
                    return department;
                }
            }
            return null;
        }

        DepartmentModel IDepartmentService.GetDepartmentModel(string departmentName)
        {
            DepartmentEntity departmentEnti = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName));
            if(departmentEnti != null)
            {
                if(departmentEnti.IsDeleted == 1)
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
            return new DepartmentModel();
        }

        Guid IDepartmentService.GetIdByDepartmentName(string departmentName)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName) == true);
            if (department != null)
            {
                if(department.IsDeleted == 1)
                {
                    return department.Id;
                } else
                {
                    return new Guid();
                }
                
            }
            return new Guid();
        }

        string IDepartmentService.GetNameByDepartmentId(Guid id)
        {
            var department = _context.Departments.FirstOrDefault(de => de.Id.Equals(id) == true);
            if (department != null)
            {
                if(department.IsDeleted == 1)
                {
                    return department.Name;
                }
                
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
            List<DepartmentEntity> departmentEntityList = _context.Departments.ToList();
            List<DepartmentModel> DepartmentModelList = new List<DepartmentModel>();

            foreach (DepartmentEntity departmentEnti in departmentEntityList)
            {
                if(departmentEnti.IsDeleted == 1)
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
            
            return;
        }
        private void DeleteAllMembersByDI(Guid DepartmentId)
        {
            string deleteQuery = "delete from DepartmentUser where DepartmentId = @DepartmentId";
            using (SqlConnection connection = new SqlConnection(_connectionStringSetting.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(deleteQuery, connection))
                {
                    // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                    command.Parameters.AddWithValue("@DepartmentId", DepartmentId);
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
                IsDeleted = 1,
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

        void IDepartmentService.EditDepartment(Guid DepartmentId, DepartmentDto newDepartment)
        {

            DepartmentEntity oldDepartment = _context.Departments.SingleOrDefault(de => de.Id == DepartmentId);
            
            if (oldDepartment != null)
            {
                oldDepartment.Name = newDepartment.DepartmentName;
                oldDepartment.Description = newDepartment.Description;
                oldDepartment.UnderDepartment = newDepartment.UnderDepartment;
                oldDepartment.Contact = newDepartment.Contact;
                oldDepartment.Code = newDepartment.Code;
                oldDepartment.IsDeleted = 1;

                //update manager, supervisors, emplyee
                
                DeleteAllMembersByDI(DepartmentId);

                IDepartmentService insertMember = new DepartmentService();

                Guid ManagerId = _userService.GetId(newDepartment.Manager.Email);
                //Add manager 
                insertMember.AddMemberIntoDepartment(DepartmentId, ManagerId, "Manager");

                if(newDepartment.Supervisors !=  null)
                {
                    foreach (ApproverModel supervior in newDepartment.Supervisors)
                    {
                        Guid supervisorId = _userService.GetId(supervior.Email);
                        insertMember.AddMemberIntoDepartment(DepartmentId, supervisorId, "Supervisor");
                    }
                }
                if(newDepartment.Employees != null)
                {
                    foreach (ApproverModel employee in newDepartment.Employees)
                    {
                        Guid employeeId = _userService.GetId(employee.Email);
                        insertMember.AddMemberIntoDepartment(DepartmentId, employeeId, "Employee");
                    }
                }
                
                _context.SaveChanges();
            }
        }

        void IDepartmentService.DeleteDepartment(Guid DepartmentId)
        {
            string deleteQuery = "update Departments set IsDeleted = 0 where id = @DepartmentId";

            using (SqlConnection connection = new SqlConnection(_connectionStringSetting.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(deleteQuery, connection))
                {
                    // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                    command.Parameters.AddWithValue("@DepartmentId", DepartmentId);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        bool IDepartmentService.IsManager(Guid myId, string myDepartment)
        {
            Guid departmentId = new Guid();
            var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(myDepartment) == true);
            if (department != null)
            {
                if (department.IsDeleted == 1)
                {
                    departmentId = department.Id;
                    string selectQuery = "select * from DepartmentUser where DepartmentId = @DepartmentId and UserId = @UserId";
                    using (SqlConnection connection = new SqlConnection(_connectionStringSetting.ConnectionString))
                    {
                        using (SqlCommand command = new SqlCommand(selectQuery, connection))
                        {
                            connection.Open();
                            command.Parameters.AddWithValue("@DepartmentId", departmentId);
                            command.Parameters.AddWithValue("@UserId", myId);
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    if (reader["Position"].Equals("Manager"))
                                    {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                } else
                {
                    return false;
                }
            }
            return false;
        }
    }
}
