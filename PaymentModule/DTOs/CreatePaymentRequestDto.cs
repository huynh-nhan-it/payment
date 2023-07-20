namespace PaymentModule.DTOs
{
    public class CreatePaymentRequestDto
    {
        public string Purpose { get; set; }
        public string Department { get; set; }
        public string PaymentFor { get; set; }
        public string Supplier { get; set; }
        public string Currency { get; set; }
        public int PONumber { get; set; }

        public string DetailTable { get; set; }
        public string PaymentMethod { get; set; }
        public string Approvers { get; set; }
    }
}
