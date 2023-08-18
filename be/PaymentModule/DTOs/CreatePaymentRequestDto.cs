namespace PaymentModule.DTOs
{
    public class CreatePaymentRequestDto
    {
        public string? RequestId { get; set; }
        public string? Purpose { get; set; }
        public string? Department { get; set; }
        public string? PaymentFor { get; set; }
        public string? Supplier { get; set; }
        public string? Currency { get; set; }
        public double? ExchangeRate { get; set; }
        public int? PONumber { get; set; }
        public string? DetailTable { get; set; }
        public string? PaymentMethod { get; set; }
        public double? SuggestedAmount { get; set; }
        public double? Tax { get; set; }
        public double? AdvanceAmount { get; set; }
        public double? TotalPayment { get; set; }
        public IFormFileCollection? files { get; set; }
        public string? Approvers { get; set; }
        public string typeSave { get; set; }
        public string UserId { get; set; }

    }
}
