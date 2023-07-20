using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentModule.Entities
{
    public class UserEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        public string Avatar { get; set; }
        public Guid AccountId { get; set; }
        public virtual AccountEntity MyAccount { get; set; }
        public ICollection<RoleEntity> Roles { get; set; }
        public ICollection<PaymentRequestEntity> PaymentRequests { get; set; }
        public ICollection<DetailRequestEntity> DetailRequests { get; set; }
        public string JobTitle { get; set; }

        public OverviewEntity Overview { get; set; }
        public AdditionalEntity Additional { get; set; }
        public FamilyEntity Family { get; set; }
        
        public SignatureEntity Signature { get; set; }
    }
}
