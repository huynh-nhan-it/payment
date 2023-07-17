using PaymentModule.Context;

namespace PaymentModule.Repository
{
    public class SupplierRepository : ISupplierRepository
    {
        private PaymentContext _context;

        public SupplierRepository(PaymentContext context)
        {
            _context = context;
        }
        Guid? ISupplierRepository.GetIdBySupplierName(string supplierName)
        {
            var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Name.Contains(supplierName) == true);
            if (supplier != null)
            {
                return supplier.Id;
            }
            return null;
        }

        string ISupplierRepository.GetSupplierNameById(Guid supplierId)
        {
            var supplier = _context.Suppliers.FirstOrDefault(de => de.Id.Equals(supplierId) == true);
            if (supplier != null)
            {
                return supplier.Name;
            }
            return "";
        }
    }
}
