using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class TotalPaymentEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public double SuggestedAmount { get; set; }
        public double Tax { get; set; }
        public double AdvanceAmount { get; set; }
        public double TotalPayment { get; set; }
        public Guid DetailRequestID { get; set; }
        public DetailRequestEntity DetailRequest { get; set; }
    }
}
