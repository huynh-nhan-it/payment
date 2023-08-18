using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private IValidation _valid;
        public SendMailController(IValidation valid) { 
            _valid = valid;
        }
        [HttpPost]
        public IActionResult SendMail(string toEmail, string content)
        {
            if(!_valid.CheckEmail(toEmail))
            {
                return Ok(new { mess = "Email sai định dạng" });
            }
            string fromMail = "pnknguyen0211@gmail.com";
            string fromPassword = "nutzorkutwnnqjgt";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Test Subject";
            message.To.Add(new MailAddress(toEmail));
            message.Body = content;
            message.IsBodyHtml = true;

            var smtpClient = new System.Net.Mail.SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);

            return Ok();
        }
    }
}
