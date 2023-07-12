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
        Guid? IDepartmentRepository.GetIdByDepartmentName(string departmentName)
        {
             var department = _context.Departments.FirstOrDefault(d => d.Name.Contains(departmentName) == true);
            if (department != null)
            {
                string s = department.Id.ToString("N").ToUpper();
                return new Guid(s);
            }
            return null;
        }
    }
}
