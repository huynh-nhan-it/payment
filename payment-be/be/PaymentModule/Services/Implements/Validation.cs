using PaymentModule.Services.IServices;
using System.Text.RegularExpressions;

namespace PaymentModule.Services.Implements
{
    public class Validation : IValidation
    {
        bool IValidation.CheckEmail(string email)
        {
            string regexPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            bool isValidEmail = Regex.IsMatch(email, regexPattern);
            return isValidEmail;
        }

        bool IValidation.CheckPhoneNumber(string phoneNumber)
        {
            string regexPattern = @"^\d{10,}$";
            bool isValidPhoneNumber = Regex.IsMatch(phoneNumber, regexPattern);
            return isValidPhoneNumber;
        }

        bool IValidation.CheckSpace(string s)
        {
            if(s.Trim() == "")
            {
                return false;
            }
            return true;
        }

        bool IValidation.IsAllCharacter(string s)
        {
            string regexPattern = @"^[A-Za-z]+$";
            bool containsOnlyLetters = Regex.IsMatch(s, regexPattern);
            return containsOnlyLetters;
        }

        bool IValidation.IsAllNumber(string s)
        {
            string regexPattern = @"^[0-9]+$";
            bool containsOnlyNumbers = Regex.IsMatch(s, regexPattern);
            return containsOnlyNumbers;
        }

        bool IValidation.IsStrongPassword(string password)
        {
            string regexPattern = @"^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$";
            bool isStrongPassword = Regex.IsMatch(password, regexPattern);
            return isStrongPassword;
        }
    }
}
