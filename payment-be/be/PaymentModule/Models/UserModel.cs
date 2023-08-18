namespace PaymentModule.Models
{
    public class UserModel
    {       
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;

        public UserModel()
        {
            FullName = "unknown";
            Email = "unknown";
            PhoneNumber = "unknown";
            Avatar = "unknown";
            JobTitle = "unknown";
        }
    }
}
