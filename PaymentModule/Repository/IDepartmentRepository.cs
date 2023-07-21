using PaymentModule.Entities;

namespace PaymentModule.Repository
{
    public interface IDepartmentRepository
    {
        public Guid? GetIdByDepartmentName(string departmentName);
        public string GetNameByDepartmentId(Guid id);

        public DepartmentEntity CheckExistDepartmentByName(string departmentName);
    }
}
