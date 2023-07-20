namespace PaymentModule.Entities
{
    public class FamilyEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
        public string MartialStatus { get; set; }
        public string ContactName { get; set; }
        public string Relationship { get; set; }
        public string Phone { get; set; }
        public string Street { get; set; }
        public string BuildingOrFlatNumber { get; set; }
        public string City { get; set; }
        public string ProvinceOrState { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

        public ICollection<RelationshipEntity> relationships { get; set;}
    }

}
