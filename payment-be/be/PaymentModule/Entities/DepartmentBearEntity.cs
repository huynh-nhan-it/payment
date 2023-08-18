using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class DepartmentBearEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string CostCenter { get; set; }
        public string Department { get; set; }
        public ICollection<DetailTableEntity> DetailTables { get; set; }
    }
}
