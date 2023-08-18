namespace PaymentModule.Models
{
    public class DepartmentModel
    {
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        public string UnderDepartment { get; set; }
        public string Contact { get; set; }
        public string Code { get; set; }
        public ApproverModel Manager { get; set; }
        public List<ApproverModel> Supervisors { get; set; }
        public List<ApproverModel> Employees { get; set; }

        public DepartmentModel()
        {
            DepartmentName = "unknown";
            Description = "unknown";
            UnderDepartment = "unknown";
            Contact = "unknown";
            Code = "unknown";
            Manager = new ApproverModel();
            Supervisors = new List<ApproverModel>();    
            Employees = new List<ApproverModel>();
        }

    }
}
