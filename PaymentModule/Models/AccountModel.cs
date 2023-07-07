namespace PaymentModule.Models
{
    public class AccountModel
    {
       
        public string email { get; set; } = string.Empty;
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
        public string refreshToken { get; set; } = string.Empty;
        public DateTime tokenCreated { get; set; }
        public DateTime tokenExpires { get; set; }

        public AccountModel()
        {

        }
        public AccountModel(string email)
        {
            this.email = email;
        }
    }
}
