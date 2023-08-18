namespace PaymentModule.Models
{
    public class CommentModel
    {
        public Guid? CommentId {  get; set; }
        public Guid UserCommentId { get; set; }
        public UserModel UserModel { get; set; }
        public DateTime CreateAt { get; set; }
        public string Content { get; set; }
        public List<CommentModel>? CommentReplyList { get; set; } = new List<CommentModel>();
    }
}
