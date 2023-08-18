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

        List<string> IDepartmentBearService.GetAllDepartmentBear()
        {
            List<string> departmentBearList = new List<string>();
            foreach(var dbEnti in _context.DepartmentBears.ToList())
            {
                var departmentBear = dbEnti.CostCenter + " - " + dbEnti.Department;
                departmentBearList.Add(departmentBear);
            }
            return departmentBearList;
        }

        string IDepartmentBearService.GetDepartmentBearById(Guid departmentBearid)
        {
            string departmentBearName = "";
            var departmentBearEnti = _context.DepartmentBears.SingleOrDefault(db => db.Id.Equals(departmentBearid));
            if(departmentBearEnti != null)
            {
                departmentBearName = departmentBearEnti.CostCenter + " - " + departmentBearEnti.Department;
            }
            return departmentBearName;
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
