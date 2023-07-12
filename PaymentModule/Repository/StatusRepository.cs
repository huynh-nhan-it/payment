using PaymentModule.Context;

namespace PaymentModule.Repository
{
    public class StatusRepository : IStatusRepository
    {
        private PaymentContext _context;
        public StatusRepository(PaymentContext context)
        {
            _context = context;
        }
        string IStatusRepository.GetStatusById(Guid id)
        {
            var status = _context.Statuses.SingleOrDefault(s => s.Id.Equals(id) == true);
            if (status != null)
            {
                return status.Status;
            }
            return "";
        }
    }
}
