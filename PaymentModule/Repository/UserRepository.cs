using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.Models;

namespace PaymentModule.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly PaymentContext _context;
        public UserRepository (PaymentContext context)
        {
            _context = context;
        }
        public UserRepository () {  }
        string IUserRepository.GetFullNameById(Guid id)
        {
            var user = _context.Users.SingleOrDefault(u => u.Id.Equals(id) == true);
            if(user != null)
            {
                return user.FirstName + " " + user.LastName;
            } return "";
        }
        Guid? IUserRepository.GetIdByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email.Contains(email) == true);
            if (user != null)
            {
                return user.Id;
            }
            return null;
        }
        string IUserRepository.GetJobTitleById(Guid id)
        {
            var user = _context.Users.SingleOrDefault(u => u.Id.Equals(id) == true);
            if (user != null)
            {
                return user.JobTitle;
            }
            return "";
        }

        string IUserRepository.GetEmailById(Guid id)
        {
            var user = _context.Users.SingleOrDefault(u => u.Id.Equals(id) == true);
            if (user != null)
            {
                return user.Email;
            }
            return "";
        }

        Guid? IUserRepository.GetIdByFullName(string Fullname)
        {
            var user = _context.Users.SingleOrDefault(u => Fullname.Contains(u.FirstName) == true || Fullname.Contains(u.LastName) == true);
            if (user != null)
            {
                return user.Id;
            }
            return null;
        }

        string IUserRepository.GetRoleById(string UserId)
        {
            string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";
            string selectQuery = "select RoleId from UserRole as ur where ur.UserId = @UserId";
           
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();
                    command.Parameters.AddWithValue("@UserId", UserId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            
                        }
                    }
                }
            }
            return "";
        }
    }
}
