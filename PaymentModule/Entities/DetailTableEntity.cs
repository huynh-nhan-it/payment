using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class DetailTableEntity
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public DateTime InvDate { get; set; }
        public string PaymentContent { get; set; }
        public double Amount { get; set; }
        public int InvNo { get; set; }
        public string Industry { get; set; }
        public Guid? DepartmentBearId { get; set; }
        public string Note { get; set; }
        public Guid DetailRequestId { get; set; }
       
    }
}

