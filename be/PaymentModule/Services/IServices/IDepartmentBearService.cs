namespace PaymentModule.Services.IServices
{
    public interface IDepartmentBearService
    {
        public Guid GetIdByDepartmentBear(string departmentBear);
        public string GetDepartmentBearById(Guid departmentBearid);
        public List<string> GetAllDepartmentBear();
    }
}
