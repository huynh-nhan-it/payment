using PaymentModule.Context;
using PaymentModule.Entities;

namespace PaymentModule.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private PaymentContext _context;

        public DepartmentRepository(PaymentContext context) {
            _context = context;
        }

        DepartmentEntity IDepartmentRepository.CheckExistDepartmentByName(string departmentName)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName) == true);
            if (department != null)
            {
                return department;
            }
            return null;
        }

        Guid? IDepartmentRepository.GetIdByDepartmentName(string departmentName)
        {
            var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName) == true);
            if (department != null)
            {
                return department.Id;
            }
            return null;
        }

        string IDepartmentRepository.GetNameByDepartmentId(Guid id)
        {
            var department = _context.Departments.FirstOrDefault(de => de.Id.Equals(id) == true);
            if (department != null)
            {
                return department.Name;
            }
            return "";
        }
    }
}
