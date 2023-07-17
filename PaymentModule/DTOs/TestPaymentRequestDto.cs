﻿namespace PaymentModule.DTOs
{
    public class TestPaymentRequestDto
    {
        public string Purpose { get; set; }
        public string Department { get; set; }
        public string PaymentFor { get; set; }
        public string Supplier { get; set; }
        public string Currency { get; set; }
        public int PONumber { get; set; }
        public IFormFileCollection files { get; set; }
        public List<DetailTableDto> DetailTable { get; set; }
        public string PaymentMethod { get; set; }
        public List<ApproverDto> Approvers { get; set; }
    }
}
