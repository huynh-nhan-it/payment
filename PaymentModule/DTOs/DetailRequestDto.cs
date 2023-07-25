namespace PaymentModule.DTOs
{
    public class DetailRequestDto
    {
        public string Purpose { get; set; }
        public string DepartmentName { get; set; }
        public string PaymentFor { get; set; }
        public string SupplierName { get; set; }
        public string Currency { get; set; }
        public double? ExchangeRate { get; set; }
        public int PONumber { get; set; }
        public string PaymentMethod { get; set; }
        /*public List<DetailTableDto> DetailTables { get; set; }*/
    }
}
