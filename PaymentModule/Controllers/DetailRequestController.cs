
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;

using PaymentModule.Models;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailRequestController : ControllerBase
    {
        public PaymentContext _context;
        public IDepartmentService _departmentRepository;
        public ISupplierService _supplierRepository;
        public ICurrencyService _currencyRepository;
        public IPaymentMethodService _paymentMethodRepository;
        public IDetailRequestService _detailRequestRepository;
        public IStatusService _statusRepository;
        private IUserService _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public DetailRequestController(PaymentContext context,
            IDepartmentService departmentRepository,
            ISupplierService supplierRepository,
            ICurrencyService currencyRepository,
            IPaymentMethodService paymentMethodRepository,
            IUserService userRepository,
            IDetailRequestService detailRequestRepository,
            IConfiguration configuration,
            ConnectionStringSettings connectionStringSettings,
            IStatusService statusRepository)
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
            string selectQuery = "SELECT DISTINCT pr.RequestCode, pr.UserId, pr.CreateAt, pr.StatusId, \r\ndr.Purpose, dr.DepartmentId, dr.PaymentFor, dr.SupplierId, dr.CurrencyId, dr.PONumber, \r\ndt.Id as DtId, dt.InvDate, dt.PaymentContent, dt.Amount, dt.InvNo, dt.Industry, dt.DepartmentTableId, dt.Note,\r\npm.Id as PmId,\r\nadr.ApproverId\r\nFROM DetailRequests AS dr \r\nINNER JOIN DetailTables AS dt ON dr.id = dt.DetailRequestId\r\nINNER JOIN PaymentRequests AS pr ON dr.id = pr.detailrequestid \r\nINNER JOIN PaymentMethods AS pm ON dr.PaymentMethodId = pm.id\r\nINNER JOIN ApproverDetailRequest AS adr ON dr.Id = adr.DetailRequestId\r\nwhere pr.RequestCode = @RequestCode";
            List<PaymentRequestDetail> listPaymentRequestDetail = new List<PaymentRequestDetail>();
            List<DetailTableModel> listDetailTable = new List<DetailTableModel>();
            List<ApproverModel> ApproverList = new List<ApproverModel>(); //trả ra model, kiểm tra đầu vào dựa va
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
                            string approverEmail = _userRepository.GetUserModelById((Guid)reader["ApproverId"]).Email;
                            var app = ApproverList.SingleOrDefault(ap => ap.Email.Equals(approverEmail) == true);
                            if (app == null)
                            {
                                var approver = new ApproverModel
                                {
                                    FullName = _userRepository.GetUserModelById((Guid)reader["ApproverId"]).FullName,
                                    Email = _userRepository.GetUserModelById((Guid)reader["ApproverId"]).Email,
                                    JobTitle = _userRepository.GetUserModelById((Guid)reader["ApproverId"]).JobTitle
                                };
                                ApproverList.Add(approver);
                            }

                            var b = new PaymentRequestDetail
                            {
                                RequestCode = (string)reader["RequestCode"],

                                UserName = _userRepository.GetUserModelById((Guid)reader["UserId"]).FullName,
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
