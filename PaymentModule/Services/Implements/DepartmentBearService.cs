using PaymentModule.Context;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class DepartmentBearService : IDepartmentBearService
    {
        private PaymentContext _context;
        public DepartmentBearService(PaymentContext context)
        {
            _context = context;
        }
        Guid IDepartmentBearService.GetIdByDepartmentBear(string departmentBear)
        {
            Guid departmentBearId = new Guid();
            var departEnti = _context.DepartmentBears.SingleOrDefault(d => (d.CostCenter + " - " + d.Department).Contains(departmentBear) == true);
            if(departEnti != null)
            {
                departmentBearId = departEnti.Id;
            }
            return departmentBearId;
        }
    }
}
