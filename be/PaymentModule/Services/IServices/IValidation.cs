using System.Diagnostics.Eventing.Reader;

namespace PaymentModule.Services.IServices
{
    public interface IValidation
    {
        public bool CheckSpace(string s);
        public bool CheckEmail(string s);
        public bool IsStrongPassword(string s);
        public bool CheckPhoneNumber(string s);
        public bool IsAllCharacter(string s);
        public bool IsAllNumber(string s);
    }
}
