namespace PaymentModule.DTOs
{
    public class SignatureDto
    {
        public string QRcode { get; set; }

        public DateTime dateTime { get; set; }

        public IFormFile ImageSignature { get; set; }
    }
}
