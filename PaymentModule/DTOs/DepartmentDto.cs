using PaymentModule.Entities;
using PaymentModule.Models;

namespace PaymentModule.DTOs
{
    public class DepartmentDto
    {
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        public string Contact { get; set; }
        public ApproverDto Manager { get; set; }
        public List<ApproverModel>? Supervisors { get; set; }
        public List<ApproverModel>? Employees { get; set; }
        public string UnderDepartment { get; set; }
        public string Code { get; set; }
       
    }
}
