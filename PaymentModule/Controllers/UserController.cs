using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.Models;
using PaymentModule.Entities;

using Microsoft.Data.SqlClient;
using PaymentModule.DTOs;
using PaymentModule.Repository;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Dynamic;
using PaymentModule.Service;
using System.Net.WebSockets;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public static List<UserModel> users = new List<UserModel>();
        public static List<AccountModel> accounts = new List<AccountModel>();
        private readonly IFileService _fileService;
        public PaymentContext _context;
        public IDepartmentRepository _departmentRepository;
        public ISupplierRepository _supplierRepository;
        public ICurrencyRepository _currencyRepository;
        public IPaymentMethodRepository _paymentMethodRepository;
        public IDetailRequestRepository _detailRequestRepository;
        private IUserRepository _userRepository;

        public UserController(PaymentContext paymentContext, IDepartmentRepository departmentRepository,
            ISupplierRepository supplierRepository,
            ICurrencyRepository currencyRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IUserRepository userRepository,
            IDetailRequestRepository detailRequestRepository)
        {
            _context = paymentContext;
            _fileService = new FileService();
            _departmentRepository = departmentRepository;
            _supplierRepository = supplierRepository;
            _currencyRepository = currencyRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _userRepository = userRepository;
            _detailRequestRepository = detailRequestRepository;
        }


        private async Task<ObjectResult> handleFile([FromForm] IFormFileCollection files, Guid Id)
        {
            var result = await _fileService.HandleFile(files, Id);
            var data = result.Value as dynamic;
            if (data.Success)
            {
                return new ObjectResult(new { attachments = data.data, success = true, error = false});
            }
            return new ObjectResult(new { message = data.Message, success = false, error = true });

        }


        private ObjectResult HandleDetailRequest(DetailRequestDto request, Guid theId)
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
            return new ObjectResult(new {detailRequest = detailRequest, success = true, error = false});
        }

        private ObjectResult HandleDetailTable(List<DetailTableDto> Table, Guid requestId)
        {
            string error_mess = "Please enter the required information";
            ICollection<DetailTableEntity> detailTableEntitys = new List<DetailTableEntity>();
            foreach (DetailTableDto colunm in Table)
            {
                if (colunm.Amount < 0  || colunm.PaymentContent == null)
                {
                    return new ObjectResult(new { success = false, error = true, message = error_mess });
                }
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
                detailTableEntitys.Add(detailTableEntity);
            }
            return new ObjectResult(new { detailTableEntity = detailTableEntitys, success = true, error = false});

        }

        private ObjectResult HandleApprovers(List<ApproverDto> approvers, Guid requestId)
        {
            string connectionString = "Data Source=LAPTOP-HA348VVB\\SQLEXPRESS;Initial Catalog=PaymentDB;Integrated Security=True";
            string error = "Please enter the required information";

            foreach (ApproverDto approver in approvers)
            {
                if (approver == null) { return new ObjectResult(new { success = false, error = true, message = error }); }
                
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
            return new ObjectResult(new { success = true, error = false, });
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

        [HttpPost("create-request")]
        public async Task<IActionResult> createRequest([FromForm] TestPaymentRequestDto prd)
        {
            Guid theId = Guid.NewGuid();
            string purpose = prd.Purpose;
            string department = prd.Department;
            string paymentfor = prd.PaymentFor;
            string supplier = prd.Supplier;
            string currency = prd.Currency;
            int ponumber = prd.PONumber;
            IFormFileCollection files = prd.files;
            string paymentmethod = prd.PaymentMethod;
            List<DetailTableDto> detailTables = prd.DetailTable;
            List<ApproverDto> approvers = prd.Approvers;


            var detailRequestDto = new DetailRequestDto
            {
                Purpose = purpose,
                DepartmentName = department,
                PaymentFor = paymentfor,
                SupplierName = supplier,
                Currency = currency,
                PONumber = ponumber,
                PaymentMethod = paymentmethod,
            };

            var resultHandDT = HandleDetailTable(detailTables, theId).Value as dynamic;
            var resultHandleDR = HandleDetailRequest(detailRequestDto, theId).Value as dynamic;
            var resultHandleAP = HandleApprovers(approvers, theId).Value as dynamic;
            var resultHandleFile = await handleFile(files, theId);
            var filesResults = resultHandleFile.Value as dynamic;
            if(purpose == null || department == null || paymentfor == null || supplier == null)
            {
                return BadRequest("Please enter the required information");
            }
            if (resultHandDT ?.error) { return BadRequest(resultHandDT ?.message); }
            if (resultHandleDR ?.error) { return BadRequest(resultHandleDR?.message); }
            if (resultHandleAP ?.error) { return BadRequest(resultHandleAP?.message); }
            if (filesResults?.error) { return BadRequest(filesResults?.message); }

            _context.DetailRequests.Add(resultHandleDR?.detailRequest);
            foreach(DetailTableEntity table in resultHandDT.detailTableEntity)
            {
                _context.DetailTables.Add(table);
            }
            foreach (AttachmentEntity attachment in filesResults?.attachments)
            {
                _context.Attachments.Add(attachment);
            }
            InsertpaymentRequest(theId);
            _context.SaveChanges();

            return Ok(new { theId, detailRequestDto });
  
        }

        private string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";
      
        [HttpGet("{id}")]
        public IActionResult GetName(Guid id)
        {
            string myName = _userRepository.GetFullNameById(id);
            return Ok(new { name = myName });
        }


        [HttpPost]
        public IActionResult AddApprover(List<ApproverDto> approvers)
        {
            foreach(ApproverDto approver in approvers)
            {
                

                string insertQuery = "INSERT INTO ApproverDetailRequest (ApproverId, DetailRequestId) VALUES (@ApproverId, @DetailRequestId)";

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(insertQuery, connection))
                    {
                        // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                        command.Parameters.AddWithValue("@DetailRequestId", new Guid("1BE6E7EA-E614-454B-DB18-08DB8299988C"));
                        command.Parameters.AddWithValue("@ApproverId", (Guid)_userRepository.GetIdByEmail(approver.Email));
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
            }
            return Ok();
        }
        

    }
}
