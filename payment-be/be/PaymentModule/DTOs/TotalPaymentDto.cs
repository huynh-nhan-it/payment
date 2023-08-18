namespace PaymentModule.DTOs
{
    public class TotalPaymentDto
    {
        public double? SuggestedAmount { get; set; }
        public double? Tax { get; set; }
        public double? AdvanceAmount { get; set; }
        public double? TotalPayment { get; set; }
    }
}
