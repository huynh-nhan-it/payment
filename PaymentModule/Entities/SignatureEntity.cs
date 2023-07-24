namespace PaymentModule.Entities
{
    public class SignatureEntity
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
        public string? QRcode { get; set; }

        public DateTime? dateTime { get; set; }

        public string? ImagePath { get; set; }
    }
}
