namespace PaymentModule.Models
{
    public class DepartmentModel
    {
        public string Decsription { get; set; }
        public string UnderDepartment { get; set; }
        public string Contact { get; set; }
        public string Code { get; set; }
        public ApproverModel Manager { get; set; }
        public List<ApproverModel> Supervisors { get; set; }
        public List<ApproverModel> Employees { get; set; }

    }
}
