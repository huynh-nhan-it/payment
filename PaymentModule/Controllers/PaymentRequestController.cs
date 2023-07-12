/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using PaymentModule.Context;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Repository;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentRequestController : ControllerBase
    {
        private readonly PaymentContext _context;
        private readonly IStatusRepository _statusRepository;
        private readonly IUserRepository _userRepository;
        public PaymentRequestController(PaymentContext paymentContext, IStatusRepository statusRepository, IUserRepository userRepository)
        {
            _statusRepository = statusRepository;
            _userRepository = userRepository;
            _context = paymentContext;
        }

        [HttpGet]
        public IActionResult GetPaymentRequets()
        {
            try
            {
                return Ok(_context.PaymentRequests.ToList());
            } catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GenerateExcel")]
        public async Task<IActionResult> GenerateExcel()
        {
            List<PaymentRequestModel> PaymentRequestList = new List<PaymentRequestModel>();

            foreach (PaymentRequestEntity paymentRequest in _context.PaymentRequests.ToList())
            {
                PaymentRequestModel request = new PaymentRequestModel
                {
                    RequestCode = paymentRequest.RequestCode,
                    Purpose = paymentRequest.Purpose,
                    CreatedBy = _userRepository.GetFullNameById(paymentRequest.UserId),
                    CreatedDate = paymentRequest.CreateAt,
                    Status = _statusRepository.GetStatusById(paymentRequest.StatusId),
                };
                PaymentRequestList.Add(request);
            }

            string emailtemplatepath = Path.Combine(Directory.GetCurrentDirectory(), "Export//ExportExcel.html");
            string htmldata = System.IO.File.ReadAllText(emailtemplatepath);

            string excelstring = "";
            foreach (PaymentRequestModel request in PaymentRequestList)
            {
                excelstring += "<tr>" +
                        "<td>" + request.RequestCode + "</td>" +
                        "<td>" + request.Purpose + "</td>" +
                        "<td>" + request.CreatedBy + "</td>" +
                        "<td>" + request.CreatedDate + "</td>" +
                        "<td>" + request.Status + "</td>" +
                    "</tr>";
            }
            htmldata = htmldata.Replace("@@ActualData", excelstring);

            string StoredFilePath = Path.Combine(Directory.GetCurrentDirectory(), "ExcelFiles", DateTime.Now.Ticks.ToString() + ".xls");
            System.IO.File.AppendAllText(StoredFilePath, htmldata);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(StoredFilePath, out var contettype))
            {
                contettype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(StoredFilePath);

            return File(bytes, contettype, Path.Combine(StoredFilePath));

        }
    }
}
*/