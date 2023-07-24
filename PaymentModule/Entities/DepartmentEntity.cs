using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class DepartmentEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<DetailRequestEntity> DetailRequests { get; set; }
        public string Description { get; set; }
        public string UnderDepartment { get; set; }
        public string Contact { get; set; }
        public string Code { get; set; }
        public ICollection<UserEntity> Users { get; set; }
    }
}
