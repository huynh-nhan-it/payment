namespace PaymentModule.DTOs
{
    public class SignatureDto
    {
        public string? Signature { get; set; }
        public string? type { get; set; }
        public string? QRcode { get; set; }            
        public IFormFile? ImageSignature { get; set; }
    }
}
