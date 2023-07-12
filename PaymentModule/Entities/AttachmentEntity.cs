using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class AttachmentEntity
    {
        private string contentType;

        public AttachmentEntity()
        {
            
        }

        public AttachmentEntity(string fileName, string contentType, Guid id)
        {
            FileName = fileName;
            this.contentType = contentType;
            Id = id;
        }



        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public Guid DetailRequestId { get; set; }
    }
}
