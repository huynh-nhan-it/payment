using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class AdditionalEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
        public string ?Nation { get; set; }
        public string ?IDCardNumber { get; set; }
        public DateTime ?DateOfIDCard { get; set; }
        public string ?PlaceOfIDCard { get; set; }
        public string ?HealthInsurance { get; set; }
        public DateTime ?StartingDate { get; set; }
        public DateTime ?StartingDateOfficial { get; set; }
        public DateTime ?LeavingDate { get; set; }
        public DateTime ?StartDateMaternityLeave { get; set; }
        public string ?Note { get; set; }
        public string ?AcademicLevel { get; set; }
        public string ?SpecializedQualification { get; set; }
        public string ?BusinessPhone { get; set; }
        public string ?HomePhone { get; set; }
        public string ?PersonalEmail { get; set; }
        public string ?BankName { get; set; }
        public string ?BranchNumber { get; set; }
        public string ?BankBranchName { get; set; }
        public string ?BankAccountNumber { get; set; }
        public string ?BankAccountName { get; set; }
        public string ?Street { get; set; }
        public string ?BuildingOrFlatNumber { get; set; }
        public string ?City { get; set; }
        public string ?ProvinceOrState { get; set; }
        public string ?PostalCode { get; set; }
        public string ?Country { get; set; }

        public ICollection<ContractEntity> ?contracts { get; set; }
    }

}
