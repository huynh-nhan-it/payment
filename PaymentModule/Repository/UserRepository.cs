using PaymentModule.Context;

namespace PaymentModule.Repository
{
    public class UserRepository : IUserRepository
    {
        private PaymentContext _context;
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
    }
}
