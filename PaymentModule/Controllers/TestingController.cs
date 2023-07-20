using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
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
        public IStatusRepository _statusRepository;
        private IUserRepository _userRepository;

        public TestingController(PaymentContext context,
            IDepartmentRepository departmentRepository,
            ISupplierRepository supplierRepository,
            ICurrencyRepository currencyRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IUserRepository userRepository,
            IDetailRequestRepository detailRequestRepository, 
            IStatusRepository statusRepository)
        {
            _context = context;
            _departmentRepository = departmentRepository;
            _supplierRepository = supplierRepository;
            _currencyRepository = currencyRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _userRepository = userRepository;
            _detailRequestRepository = detailRequestRepository;
            _statusRepository = statusRepository;
        }


        private void InsertDetailRequest(DetailRequestDto request, Guid requestId)
        {
            Guid? departmentId = _departmentRepository.GetIdByDepartmentName(request.DepartmentName);
            Guid? supplierId = _supplierRepository.GetIdBySupplierName(request.SupplierName);
            Guid? curencyId = _currencyRepository.GetIdByCurrency(request.Currency);
            Guid? paymentId = _paymentMethodRepository.GetIdByMethod(request.PaymentMethod);
            var detailRequest = new DetailRequestEntity
            {
                Id = requestId,
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
                StatusId = new Guid("8845CC80-77F7-4F7B-B23D-CA994B8D07A4"), //Approved
                UserId = new Guid("DC1D4A9C-EDEA-459F-B8DE-6CB840A7BFCB"), //Testing...
                CreateAt = DateTime.Now,
                DetailRequestId = requestId
            };
            _context.PaymentRequests.Add(paymentRequest);
            _context.SaveChanges();
        }

        [HttpGet("{RequestCode}")]
        public IActionResult GetDetailRequestByCode(string RequestCode)
        {
            string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";
            string selectQuery = "SELECT DISTINCT  pr.RequestCode, pr.UserId, pr.CreateAt, pr.StatusId, \r\ndr.Purpose, dr.DepartmentId, dr.PaymentFor, dr.SupplierId, dr.CurrencyId, dr.PONumber, \r\ndt.Id as DtId, dt.InvDate, dt.PaymentContent, dt.Amount, dt.InvNo, dt.Industry, dt.DepartmentTableId, dt.Note,\r\npm.Id as PmId,\r\nadr.ApproverId\r\nFROM DetailRequests AS dr \r\nINNER JOIN DetailTables AS dt ON dr.id = dt.DetailRequestId\r\nINNER JOIN PaymentRequests AS pr ON dr.id = pr.detailrequestid \r\nINNER JOIN PaymentMethods AS pm ON dr.PaymentMethodId = pm.id\r\nINNER JOIN ApproverDetailRequest AS adr ON dr.Id = adr.DetailRequestId\r\nwhere pr.RequestCode = @RequestCode";
            List<PaymentRequestDetail> listPaymentRequestDetail = new List<PaymentRequestDetail>();
            List<DetailTableModel> listDetailTable = new List<DetailTableModel>();
            List<ApproverModel> ApproverList = new List<ApproverModel>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@RequestCode", RequestCode);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var a = new DetailTableModel
                            {
                                Id = (Guid)reader["DtId"],
                                InvDate = (DateTime)reader["InvDate"],
                                PaymentContent = (string)reader["PaymentContent"],
                                Amount = (double)reader["Amount"],
                                InvNo = (int)reader["InvNo"],
                                Industry = (string)reader["Industry"],
                                DepartmentOnTable = _departmentRepository.GetNameByDepartmentId((Guid)reader["DepartmentTableId"]),
                                Note = (string)reader["Note"],
                            };

                            if (listDetailTable.SingleOrDefault(dt => dt.Id.Equals(a.Id)) == null)
                            {
                                listDetailTable.Add(a);
                            }

                            if (ApproverList.SingleOrDefault(ap => ap.Id.Equals((Guid)reader["ApproverId"])) == null) 
                            {
                                var approver = new ApproverModel
                                {
                                    Id = (Guid)reader["ApproverId"],
                                    FullName = _userRepository.GetFullNameById((Guid)reader["ApproverId"]),
                                    Email = _userRepository.GetEmailById((Guid)reader["ApproverId"]),
                                    JobTitle = _userRepository.GetJobTitleById((Guid)reader["ApproverId"])
                                };
                                ApproverList.Add(approver);
                            }

                            var b = new PaymentRequestDetail
                            {
                                RequestCode = (string)reader["RequestCode"],

                                UserName = _userRepository.GetFullNameById((Guid)reader["UserId"]),
                                CreateAt = (DateTime)reader["CreateAt"],
                                Status = _statusRepository.GetStatusById((Guid)reader["StatusId"]),
                                Purpose = (string)reader["Purpose"],
                                Department = _departmentRepository.GetNameByDepartmentId((Guid)reader["DepartmentId"]), //
                                PaymentFor = (string)reader["PaymentFor"],
                                Supplier = _supplierRepository.GetSupplierNameById((Guid)reader["SupplierId"]), //
                                Currency = _currencyRepository.GetCurrencyNameById((Guid)reader["CurrencyId"]), //
                                PONumber = (int)reader["PONumber"],
                                TableDetailRequest = listDetailTable,
                                Method = _paymentMethodRepository.GetPaymentMethodById((Guid)reader["PmId"]), //
                                ApproverIds = ApproverList, //
                            };
                            listPaymentRequestDetail.Add(b);
                        }
                    }
                }
            }
            return Ok(listPaymentRequestDetail[listPaymentRequestDetail.Count - 1]);
        }
        /*[HttpPost]
        public IActionResult SubmitRequest(CreatePaymentRequestDto prd)
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

             List<DetailTableDto> detailTable = new List<DetailTableDto>();
             foreach (DetailTableDto raw in prd.DetailTable)
             {
                 detailTable.Add(raw);
             }

             List<ApproverDto> approverList = new List<ApproverDto>();
             foreach (ApproverDto app in prd.Approvers)
             {
                 approverList.Add(app);
             }
             InsertDetailRequest(detailRequestDto, theId);
             InsertDetailTable(detailTable, theId);
             InsertApprovers(approverList, theId);
             InsertpaymentRequest(theId);
             return Ok(new { theId, detailRequestDto });
         }*/
    }
}
