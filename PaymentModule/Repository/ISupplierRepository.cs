namespace PaymentModule.Repository
{
    public interface ISupplierRepository
    {
        public Guid? GetIdBySupplierName(string supplierName); 
    }
}
