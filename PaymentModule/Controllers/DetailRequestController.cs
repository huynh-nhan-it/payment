    
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
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
            bool checkAttachment = false;
            string selectQuery = "";
            Guid detailRequestId = _detailRequestService.GetDRidByRequestCode(RequestCode);
            if(detailRequestId !=  Guid.Empty)
            {
                var attach = _context.Attachments.FirstOrDefault(attach => attach.DetailRequestId.Equals(detailRequestId));
                if(attach != null)
                {
                    checkAttachment = true;
                    selectQuery = "SELECT DISTINCT dr.Id as drId, pr.Id as prId ,pr.RequestCode, pr.UserId, pr.CreateAt, pr.StatusId,  dr.Purpose, dr.DepartmentId, dr.PaymentFor, dr.SupplierId, dr.CurrencyId, dr.ExchangeRate , dr.PONumber,  dt.Id as DtId, dt.InvDate, dt.PaymentContent, dt.Amount, dt.InvNo, dt.Industry, dt.DepartmentBearId, dt.Note, pm.Id as PmId, atm.FilePath, adr.ApproverId   FROM DetailRequests AS dr   INNER JOIN DetailTables AS dt ON dr.id = dt.DetailRequestId  INNER JOIN PaymentRequests AS pr ON dr.id = pr.detailrequestid  INNER JOIN PaymentMethods AS pm ON dr.PaymentMethodId = pm.id   INNER JOIN ApproverDetailRequest AS adr ON dr.Id = adr.DetailRequestId  INNER JOIN Attachments as atm on dr.Id = atm.DetailRequestId  where pr.RequestCode like @RequestCode";
                } else
                {
                    selectQuery = "SELECT DISTINCT dr.Id as drId, pr.Id as prId ,pr.RequestCode, pr.UserId, pr.CreateAt, pr.StatusId, dr.Purpose, dr.DepartmentId, dr.PaymentFor, dr.SupplierId, dr.CurrencyId, dr.ExchangeRate , dr.PONumber,   dt.Id as DtId, dt.InvDate, dt.PaymentContent, dt.Amount, dt.InvNo, dt.Industry, dt.DepartmentBearId, dt.Note, pm.Id as PmId, adr.ApproverId  FROM DetailRequests AS dr  INNER JOIN DetailTables AS dt ON dr.id = dt.DetailRequestId INNER JOIN PaymentRequests AS pr ON dr.id = pr.detailrequestid INNER JOIN PaymentMethods AS pm ON dr.PaymentMethodId = pm.id  INNER JOIN ApproverDetailRequest AS adr ON dr.Id = adr.DetailRequestId   where pr.RequestCode like @RequestCode";

                }
                List<PaymentRequestDetail> listPaymentRequestDetail = new List<PaymentRequestDetail>();
                List<DetailTableModel> listDetailTable = new List<DetailTableModel>();
                List<ApproverModel> ApproverList = new List<ApproverModel>();
                List<string> attachmentList = new List<string>();
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
                                if(checkAttachment == true)
                                {
                                    string fullPath = (string)reader["FilePath"];
                                    string deteleWwwroot = fullPath.Split("/")[1];
                                    string finalPath = "http://localhost:5005/" + deteleWwwroot.Replace("\\", "/");
                                   
                                    attachmentList.Add(finalPath);
                                }
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
                                    Id = (Guid)reader["drId"],
                                    requestId = (Guid)reader["prId"],
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
                                    AttachmentList = attachmentList,
                                };
                                listPaymentRequestDetail.Add(b);
                            }
                        }
                    }
                }
                return Ok(listPaymentRequestDetail[listPaymentRequestDetail.Count - 1]);
            } else
            {
                return Ok("Không tìm thấy request id này");
            }

            
        }

        [HttpGet("Approver")]
        public IActionResult GetApproversOfRequest(Guid DetailRequestId)
        {
            List<ObjectResult> appList = new List<ObjectResult>();
            appList = _userService.GetApproverOfRequest(DetailRequestId);
            return Ok(appList);
            /*try
            {
                List<ObjectResult> appList = new List<ObjectResult>();
                appList = _userService.GetApproverOfRequest(DetailRequestId);
                return Ok(appList);
            }catch
            {
                return Ok("Not found");
            }*/
        }
    }
}
