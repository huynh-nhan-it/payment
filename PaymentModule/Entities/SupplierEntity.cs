using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections;

namespace PaymentModule.Entities
{
    public class SupplierEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<DetailRequestEntity> DetailRequests { get; set; }
        public ICollection<BankEntity> Banks { get; set; }
    }
}
