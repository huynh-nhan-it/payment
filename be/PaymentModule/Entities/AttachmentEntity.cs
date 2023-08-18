using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class AttachmentEntity
    {


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; 
        }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public Guid DetailRequestId { get; set; }   
    }
}
