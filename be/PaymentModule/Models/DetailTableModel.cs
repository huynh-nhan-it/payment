namespace PaymentModule.Models
{
    public class DetailTableModel
    {
        public Guid Id { get; set; } 
        public DateTime InvDate { get; set; }
        public string PaymentContent { get; set; }
        public double Amount { get; set; }
        public int InvNo { get; set; }
        public string Industry { get; set; }
        public string DepartmentOnTable { get; set; }
        public string Note { get; set; }
    }
}
