using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;

namespace PaymentModule.Services.IServices
{
    public interface IDepartmentService
    {
        public Guid GetIdByDepartmentName(string departmentName);
        public string GetNameByDepartmentId(Guid id);
        public DepartmentEntity CheckExistDepartmentByName(string departmentName);
        public DepartmentModel GetDepartmentModel(string departmentName);
        public List<DepartmentModel> GetDepartmentModelList();
        public void AddMemberIntoDepartment(Guid DepartmentId, Guid UserId, string Position);
        public void AddDepartment(DepartmentDto departmentDto);
        public void EditDepartment(Guid DepartmentId,  DepartmentDto NewDepartment);
        public void DeleteDepartment(Guid DepartmentId);
        public bool IsManager(Guid myId, string myDepartment);
    }
}
