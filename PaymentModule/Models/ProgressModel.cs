namespace PaymentModule.Models
{
    public class ProgressModel
    {
        public ProgressModel() { }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }

        public string Avatar { get; set; }
        public string Status { get; set; }

        public int Queue { get; set; }
    }
}
