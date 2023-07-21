namespace PaymentModule.Models
{
    public class ApproverModel
    {
        public ApproverModel() { }
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
    }
}
