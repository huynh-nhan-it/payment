using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class ContractEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid AddtionalId { get; set; }
        public string ?ContractType { get; set; }
        public DateTime ?FromDate { get; set; }
        public DateTime ?ToDate { get; set; }
        public DateTime ?SigningDate { get; set; }
        public string ?Subject { get; set; }
        public string ?Department { get; set; }
        public string ?Note { get; set; }
    }
}
