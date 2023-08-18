using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class StatusEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Status { get; set; }

        public ICollection<PaymentRequestEntity> PaymentRequests { get; set; }

    }
}
