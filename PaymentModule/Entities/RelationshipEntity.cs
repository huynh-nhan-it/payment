namespace PaymentModule.Entities
{
    public class RelationshipEntity
    {
        public Guid Id { get; set; }

        public Guid FamilyId { get; set; }
        public string ContactName { get; set; }
        public DateTime BirthDay { get; set; }
        public string Relationship { get; set; }
        public string Note { get; set; }
    }

}
