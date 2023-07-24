namespace PaymentModule.DTOs
{
    public class CommentDto
    {
        public Guid UserId { get; set; }
        public Guid DetailRequestId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid? ParentId { get; set; }
    }
}
