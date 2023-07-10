using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentModule.Entities
{
    public class AccountEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [ForeignKey("UserEntity")]
        public Guid UserId { get; set; }
        public UserEntity MyUser { get; set; }    
    }
}
