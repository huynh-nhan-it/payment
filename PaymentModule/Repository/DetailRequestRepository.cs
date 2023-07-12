using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;

namespace PaymentModule.Repository
{
    public class DetailRequestRepository : IDetailRequestRepository
    {
        private PaymentContext _context;

        public DetailRequestRepository(PaymentContext context)
        {
            _context = context;
        }
        string IDetailRequestRepository.GetPurposeById(Guid id)
        {
            var detailRequest = _context.DetailRequests.FirstOrDefault(u => u.Id.Equals(id) == true);
            if (detailRequest != null)
            {
                return detailRequest.Purpose;
            }
            return null;
        }
    }
}
