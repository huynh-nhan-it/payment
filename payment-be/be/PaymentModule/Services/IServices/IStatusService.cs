namespace PaymentModule.Services.IServices
{
    public interface IStatusService
    {
        public string GetStatusById(Guid id);
        public Guid GetIdByStatus(string status);
    }
}
