namespace PaymentModule.DTOs
{
    public class AcceptRequestDto
    {
        public Guid ApproverId { get; set; }
        public Guid RequestId { get; set; }
        public string Action { get; set; }
    }
}
