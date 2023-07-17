using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class AttachmentEntity
    {

        public AttachmentEntity(string filePath, string fileType, Guid id)
        {
            FilePath = filePath;
            FileType = fileType;
            Id = id;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; 
        }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public byte[] Content { get; set; }
        public Guid DetailRequestId { get; set; }
    }
}
