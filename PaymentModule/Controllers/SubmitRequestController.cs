/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.DTOs;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmitRequestController : ControllerBase
    {

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
            return Ok(new { theId, detailRequestDto, detailTable, approverList });
        }

        private bool InsertDetailRequest(DetailRequestDto DetailRequest)
        {
            return true;
        }
    }

}
*/