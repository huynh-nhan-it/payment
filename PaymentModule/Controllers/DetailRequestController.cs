
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
        public IDepartmentService _departmentService;
        public ISupplierService _supplierService;
        public ICurrencyService _currencyService;
        public IPaymentMethodService _paymentMethodService;
        public IDetailRequestService _detailRequestService;
        public IStatusService _statusService;
        private IUserService _userService;
        private IDepartmentBearService _departmentBearService;
        private readonly IConfiguration _configuration;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public DetailRequestController(PaymentContext context,
            IDepartmentService departmentService,
            IDepartmentBearService departmentBearService,
            ISupplierService supplierService,
            ICurrencyService currencyService,
            IPaymentMethodService paymentMethodService,
            IUserService userService,
            IDetailRequestService detailRequestService,
            IConfiguration configuration,
            ConnectionStringSettings connectionStringSettings,
            IStatusService statusService)
        {
            _context = context;
            _departmentService = departmentService;
            _departmentBearService = departmentBearService;
            _supplierService = supplierService;
            _currencyService = currencyService;
            _paymentMethodService = paymentMethodService;
            _userService = userService;
            _detailRequestService = detailRequestService;
            _statusService = statusService;
            _configuration = configuration;
            _connectionStringSettings = connectionStringSettings;
        }

        [HttpGet("{RequestCode}")]
        public IActionResult GetDetailRequestByCode(string RequestCode)
        {
            
            string connectionString = _connectionStringSettings.ConnectionString;
            string selectQuery = "SELECT DISTINCT pr.RequestCode, pr.UserId, pr.CreateAt, pr.StatusId, \r\ndr.Purpose, dr.DepartmentId, dr.PaymentFor, dr.SupplierId, dr.CurrencyId, dr.ExchangeRate , dr.PONumber, \r\ndt.Id as DtId, dt.InvDate, dt.PaymentContent, dt.Amount, dt.InvNo, dt.Industry, dt.DepartmentBearId, dt.Note, \r\npm.Id as PmId, \r\nadr.ApproverId \r\nFROM DetailRequests AS dr \r\nINNER JOIN DetailTables AS dt ON dr.id = dt.DetailRequestId \r\nINNER JOIN PaymentRequests AS pr ON dr.id = pr.detailrequestid \r\nINNER JOIN PaymentMethods AS pm ON dr.PaymentMethodId = pm.id\r\nINNER JOIN ApproverDetailRequest AS adr ON dr.Id = adr.DetailRequestId  \r\nwhere pr.RequestCode like @RequestCode";
            List<PaymentRequestDetail> listPaymentRequestDetail = new List<PaymentRequestDetail>();
            List<DetailTableModel> listDetailTable = new List<DetailTableModel>();
            List<ApproverModel> ApproverList = new List<ApproverModel>(); //trả ra model, kiểm tra đầu vào dựa va
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    string requestCode = "%" + RequestCode + "%";
                    command.Parameters.AddWithValue("@RequestCode", requestCode);
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
                                DepartmentOnTable = _departmentBearService.GetDepartmentBearById((Guid)reader["DepartmentBearId"]),
                                Note = (string)reader["Note"],
                            };

                            if (listDetailTable.SingleOrDefault(dt => dt.Id.Equals(a.Id)) == null)
                            {
                                listDetailTable.Add(a);
                            }
                            string approverEmail = _userService.GetUserModelById((Guid)reader["ApproverId"]).Email;
                            var app = ApproverList.SingleOrDefault(ap => ap.Email.Equals(approverEmail) == true);
                            if (app == null)
                            {
                                var approver = new ApproverModel
                                {
                                    FullName = _userService.GetUserModelById((Guid)reader["ApproverId"]).FullName,
                                    Email = _userService.GetUserModelById((Guid)reader["ApproverId"]).Email,
                                    JobTitle = _userService.GetUserModelById((Guid)reader["ApproverId"]).JobTitle
                                };
                                ApproverList.Add(approver);
                            }
                            double exRate = 0d;
                            if (reader["ExchangeRate"] != null && !DBNull.Value.Equals(reader["ExchangeRate"]))
                            {
                                exRate = (double)reader["ExchangeRate"];
                            }

                            var b = new PaymentRequestDetail
                            {
                                RequestCode = (string)reader["RequestCode"],

                                UserName = _userService.GetUserModelById((Guid)reader["UserId"]).FullName,
                                CreateAt = (DateTime)reader["CreateAt"],
                                Status = _statusService.GetStatusById((Guid)reader["StatusId"]),
                                Purpose = (string)reader["Purpose"],
                                Department = _departmentService.GetNameByDepartmentId((Guid)reader["DepartmentId"]), //
                                PaymentFor = (string)reader["PaymentFor"],
                                Supplier = _supplierService.GetSupplierNameById((Guid)reader["SupplierId"]), //
                                Currency = _currencyService.GetCurrencyNameById((Guid)reader["CurrencyId"]), //
                                ExchangeRate = exRate,
                                PONumber = (int)reader["PONumber"],
                                TableDetailRequest = listDetailTable,
                                Method = _paymentMethodService.GetPaymentMethodById((Guid)reader["PmId"]), //
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
