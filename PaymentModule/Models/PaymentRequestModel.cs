using PaymentModule.Entities;

namespace PaymentModule.Models
{
    public class PaymentRequestModel
    {
        public string RequestCode { get; set; }
        public string Purpose { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } 
        public string Status { get; set; }
        
    }
}
