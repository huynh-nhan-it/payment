namespace PaymentModule.DTOs
{
    public class CommentDto
    {
        public Guid UserId { get; set; }
        public Guid DetailRequestId { get; set; }
        public string Content { get; set; }
        public string CreatedAt { get; set; }

        public Guid parentId { get; set; }
    }
}
