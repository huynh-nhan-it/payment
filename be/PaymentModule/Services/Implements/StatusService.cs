using PaymentModule.Context;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class StatusService : IStatusService
    {
        private PaymentContext _context;
        public StatusService(PaymentContext context)
        {
            _context = context;
        }

        public Guid GetIdByStatus(string status)
        {
            var s = _context.Statuses.FirstOrDefault(sta => sta.Status.Contains(status) == true);
            if (s != null)
            {
                return s.Id;
            }
            return new Guid();
        }

        string IStatusService.GetStatusById(Guid id)
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
