using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Repository;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestingController : ControllerBase
    {
        public PaymentContext _context;
        public IDepartmentRepository _departmentRepository;
        public ISupplierRepository _supplierRepository;
        public ICurrencyRepository _currencyRepository;
        public IPaymentMethodRepository _paymentMethodRepository;
        public IDetailRequestRepository _detailRequestRepository;
        private IUserRepository _userRepository;

        public TestingController(PaymentContext context,
            IDepartmentRepository departmentRepository,
            ISupplierRepository supplierRepository,
            ICurrencyRepository currencyRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IUserRepository userRepository,
            IDetailRequestRepository detailRequestRepository)
        {
            _context = context;
            _departmentRepository = departmentRepository;
            _supplierRepository = supplierRepository;
            _currencyRepository = currencyRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _userRepository = userRepository;
            _detailRequestRepository = detailRequestRepository;
        }


        private void InsertDetailRequest(DetailRequestDto request, Guid theId)
        {
            Guid? departmentId = _departmentRepository.GetIdByDepartmentName(request.DepartmentName);
            Guid? supplierId = _supplierRepository.GetIdBySupplierName(request.SupplierName);
            Guid? curencyId = _currencyRepository.GetIdByCurrency(request.Currency);
            Guid? paymentId = _paymentMethodRepository.GetIdByMethod(request.PaymentMethod);
            var detailRequest = new DetailRequestEntity
            {
                Id = theId,
                Purpose = request.Purpose,
                PaymentFor = request.PaymentFor,
                PONumber = request.PONumber,
                DepartmentId = departmentId.HasValue ? departmentId.Value : Guid.Empty,
                SupplierId = supplierId.HasValue ? supplierId.Value : Guid.Empty,
                CurrencyId = curencyId.HasValue ? curencyId.Value : Guid.Empty,
                PaymentMethodId = paymentId.HasValue ? paymentId.Value : Guid.Empty
            };
            _context.DetailRequests.Add(detailRequest);
            _context.SaveChanges();
        }

        private void InsertDetailTable(List<DetailTableDto> Table, Guid requestId)
        {
            foreach (DetailTableDto colunm in Table)
            {
                var detailTableEntity = new DetailTableEntity
                {
                    InvDate = colunm.InvDate,
                    PaymentContent = colunm.PaymentContent,
                    Amount = colunm.Amount,
                    InvNo = colunm.InvNo,
                    Industry = colunm.Industry,
                    DepartmentTableId = (Guid)_departmentRepository.GetIdByDepartmentName(colunm.DepartmentBear),
                    Note = colunm.Note,
                    DetailRequestId = requestId,
                };
                _context.DetailTables.Add(detailTableEntity);
            }
            _context.SaveChanges();
        }
        private void InsertApprovers(List<ApproverDto> approvers, Guid requestId)
        {
            string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";

            foreach (ApproverDto approver in approvers)
            {
                string insertQuery = "INSERT INTO ApproverDetailRequest (ApproverId, DetailRequestId) VALUES (@ApproverId, @DetailRequestId)";

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(insertQuery, connection))
                    {
                        // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                        command.Parameters.AddWithValue("@DetailRequestId", requestId);
                        command.Parameters.AddWithValue("@ApproverId", (Guid)_userRepository.GetIdByEmail(approver.Email));
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
            }
        }

        private void InsertpaymentRequest(Guid requestId)
        {
            var paymentRequest = new PaymentRequestEntity
            {
                RequestCode = "2023OPS-PAY-000001", //Testing...
                Purpose = _detailRequestRepository.GetPurposeById(requestId),
                StatusId = new Guid("6CE397A7-0949-4208-A56A-F9EBA87686A6"), //Approved
                UserId = new Guid("A1CC9C62-A8A5-4CFF-A516-1C18007EF7FD"), //Testing...
                CreateAt = DateTime.Now,
                DetailRequestId = requestId
            };
            _context.PaymentRequests.Add(paymentRequest);
            _context.SaveChanges();
        }

        [HttpPost]
        public IActionResult SubmitRequest(TestPaymentRequestDto prd)
        {
            Guid theId = Guid.NewGuid();

            var detailRequestDto = new DetailRequestDto
            {
                Purpose = prd.Purpose,
                DepartmentName = prd.Department,
                PaymentFor = prd.PaymentFor,
                SupplierName = prd.Supplier,
                Currency = prd.Currency,
                PONumber = prd.PONumber,
                PaymentMethod = prd.PaymentMethod,
            };

            /*ICollection<IFormFile> files = prd.files;*/
            InsertDetailRequest(detailRequestDto, theId);
            InsertDetailTable(prd.DetailTable, theId);
            InsertApprovers(prd.Approvers, theId);
            InsertpaymentRequest(theId);
            return Ok(new { theId, detailRequestDto });
        }
    }
}
