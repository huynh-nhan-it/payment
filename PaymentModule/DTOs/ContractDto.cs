namespace PaymentModule.DTOs
{
    public class ContractDto
    {
        public string ContractType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime SigningDate { get; set; }
        public string Subject { get; set; }
        public string Department { get; set; }
        public string Note { get; set; }
    }
}
