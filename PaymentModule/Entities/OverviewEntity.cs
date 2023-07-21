using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class OverviewEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        // Primary key
        public Guid Id { get; set; }

        // Foreign key - liên kết với UserEnity
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }

        // Các thuộc tính khác
        public int EmployeeNumber { get; set; }
        public string Sex { get; set; }
        public DateTime BirthDay { get; set; }
        public string Position { get; set; }
        public string Company { get; set; }
        public string Unit { get; set; }
        public string FunctionEmployee { get; set; }
        public string Department { get; set; }
        public string SectionsTeams { get; set; }
        public string Groups { get; set; }
        public string OfficeLocation { get; set; }
        public string LineManager { get; set; }
        public string BelongToDepartments { get; set; }
        public string CostCenter { get; set; }
        public string Rank { get; set; }
        public string EmployeeType { get; set; }
        public string Rights { get; set; }
    }
}
