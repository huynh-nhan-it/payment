/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
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


        public DetailRequestController (PaymentContext context, 
            IDepartmentRepository departmentRepository, 
            ISupplierRepository supplierRepository, 
            ICurrencyRepository currencyRepository, 
            IPaymentMethodRepository paymentMethodRepository)
        {
            _context = context;
            _departmentRepository = departmentRepository;
            _supplierRepository = supplierRepository;
            _currencyRepository = currencyRepository;
            _paymentMethodRepository = paymentMethodRepository;
        }

        [HttpPost]
        public IActionResult SubmitRequest(DetailRequestDto request)
        {
            Guid? departmentId = _departmentRepository.GetIdByDepartmentName(request.DepartmentName);
            Guid? supplierId = _supplierRepository.GetIdBySupplierName(request.SupplierName);
            Guid? curencyId = _currencyRepository.GetIdByCurrency(request.Currency);
            Guid? paymentId = _paymentMethodRepository.GetIdByMethod(request.PaymentMethod);
            Guid detailRequestId = Guid.NewGuid();
            var detailRequest = new DetailRequestEntity
            {
                Id = detailRequestId,
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

            return Ok(_paymentMethodRepository.GetIdByMethod(request.PaymentMethod));
        }
      
    }
}
*/