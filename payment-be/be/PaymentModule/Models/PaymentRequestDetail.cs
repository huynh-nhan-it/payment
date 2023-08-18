﻿namespace PaymentModule.Models
{
    public class PaymentRequestDetail
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid requestId { get; set; }
        public string RequestCode { get; set; }
        public string UserName { get; set; }
        public DateTime CreateAt { get; set; }
        public string Status { get; set; }
        public string Purpose { get; set; }
        public string Department { get; set; }
        public string PaymentFor { get; set; }
        public string Supplier { get; set; }
        public string Currency { get; set; }
        public double? ExchangeRate { get; set; }
        public int PONumber { get; set; }
        public List<DetailTableModel> TableDetailRequest { get; set; }
        public string Method { get; set; }
        public List<ApproverModel> ApproverIds { get; set; }
        public List<string> AttachmentList { get; set; }
        public double SuggestedAmount { get; set; }
        public double Tax { get; set; }
        public double AdvanceAmount { get; set; }
        public double TotalPayment { get; set; }
    }
}
