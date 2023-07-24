namespace PaymentModule.Models
{
    public class ConnectionStringSettings
    {
        public string ConnectionString { get; }
        public ConnectionStringSettings(string connectionString)
        {
            ConnectionString = connectionString;
        }
    }
}
