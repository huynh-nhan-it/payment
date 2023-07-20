namespace PaymentModule.Entities
{
    public class TravelEntity
    {
        public Guid Id { get; set; }

        public Guid PropId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Information { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }
    }
}
