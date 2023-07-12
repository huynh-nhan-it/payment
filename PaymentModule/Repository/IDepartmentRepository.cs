namespace PaymentModule.Repository
{
    public interface IDepartmentRepository
    {
        public Guid? GetIdByDepartmentName(string supplierName);
    }
}
