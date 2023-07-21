
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;

using PaymentModule.Models;
using PaymentModule.Repository;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailRequestController : ControllerBase
    {
        public PaymentContext _context;
        public IDepartmentRepository _departmentRepository;
        public ISupplierRepository _supplierRepository;
        public ICurrencyRepository _currencyRepository;
        public IPaymentMethodRepository _paymentMethodRepository;
        public IDetailRequestRepository _detailRequestRepository;
        public IStatusRepository _statusRepository;
        private IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ConnectionStringSettings _connectionStringSettings;


        public DetailRequestController(PaymentContext context,
            IDepartmentRepository departmentRepository,
            ISupplierRepository supplierRepository,
            ICurrencyRepository currencyRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IUserRepository userRepository,
            IDetailRequestRepository detailRequestRepository,
            IConfiguration configuration,
            ConnectionStringSettings connectionStringSettings,
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
            _configuration = configuration;
            _connectionStringSettings = connectionStringSettings;
        }

        [HttpGet("{RequestCode}")]
        public IActionResult GetDetailRequestByCode(string RequestCode)
        {

            string connectionString = _connectionStringSettings.ConnectionString;
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

    }
}
