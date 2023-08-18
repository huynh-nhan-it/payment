using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class BankEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid? Id { get; set; }
        public string? AccountNumber { get; set; }
        public string? BankName { get; set; }
        public string? Beneficiary { get; set; }
        public Guid? SupplierID { get; set; }
        public Guid? DetailRequestId { get; set; }
        public DetailRequestEntity? DetailRequest { get; set; }
    }
}
