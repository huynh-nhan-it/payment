using PaymentModule.Entities;

namespace PaymentModule.DTOs
{
    public class PersonalDto
    {
        public IFormFile ?Avatar { get; set; }
        
        public OverviewDto ?overview { get; set; }

        public AdditionalDto ?additional { get; set; }

        public FamilyDto ?family { get; set; }

        public SignatureDto ?signature { get; set; }
    }
}
