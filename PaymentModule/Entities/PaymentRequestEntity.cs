using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class PaymentRequestEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string RequestCode { get; set; }
        
        public string Purpose { get; set; }
        public Guid StatusId { get; set; }
        public Guid UserId { get; set; } //created by
        public DetailRequestEntity DetailRequest { get; set; }
    }
}
