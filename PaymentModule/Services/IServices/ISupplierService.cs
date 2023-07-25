namespace PaymentModule.Services.IServices
{
    public interface ISupplierService
    {
        public Guid? GetIdBySupplierName(string supplierName);
        public string GetSupplierNameById(Guid supplierId);
        public List<string> GetSupplierList();
    }
}
