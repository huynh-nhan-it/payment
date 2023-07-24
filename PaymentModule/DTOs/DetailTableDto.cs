namespace PaymentModule.DTOs
{
    public class DetailTableDto
    {
        public DateTime InvDate { get; set; }
        public string PaymentContent { get; set; }
        public double Amount { get; set; }
        public int InvNo { get; set; }
        public string Industry { get; set; }
        public string? DepartmentBear { get; set; }
        public string Note { get; set; }

    }
}
