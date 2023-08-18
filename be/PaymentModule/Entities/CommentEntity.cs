using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class CommentEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreateAt { get; set; }
        public Guid? ParentId { get; set; }
        public Guid DetailRequestId { get; set; }

    }
}
