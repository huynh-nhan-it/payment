namespace PaymentModule.Models
{
    public class AccountModel
    {
        public string username { get; set; } = string.Empty;
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
        public string refreshToken { get; set; } = string.Empty;
        public DateTime tokenCreated { get; set; }
        public DateTime tokenExpires { get; set; }
    
    }
}
