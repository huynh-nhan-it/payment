using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenController : ControllerBase
    {

        public static List<UserModel> users = new List<UserModel>();
        public static List<AccountModel> accounts = new List<AccountModel>();
        private readonly PaymentContext _context;
        private readonly IConfiguration _config;
        private readonly IAccountService _accountRepository;
        public AuthenController(IConfiguration configuration, IAccountService accountRepository, PaymentContext context)
        {
            _context = context;
            _config = configuration;
            _accountRepository = accountRepository;
        }

        [HttpGet, Authorize(Roles = "Admin")]
        public IActionResult GetMyAccount()
        {
            return Ok(_accountRepository.GetMyAccount());
        }

        [HttpPost("Register")]
        public IActionResult Register(UserDto request)
        {
            if (request.password == request.confirmPassword)
            {
                Guid theId = Guid.NewGuid();
                var userEntity = new UserEntity
                {
                    Id = theId,
                    FirstName = request.firstName,
                    LastName = request.lastName,
                    Email = request.email,
                    PhoneNumber = request.phoneNumber,
                    Avatar = request.avatar,
                    JobTitle = request.jobTitle,
                };
                _context.Users.Add(userEntity);
                _context.SaveChanges();

                HashPassword(request.password, out byte[] passwordHash, out byte[] passwordSalt);

                var accountEntity = new AccountEntity
                {
                    Email = request.email,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    UserId = theId
                };

                _context.Accounts.Add(accountEntity);
                _context.SaveChanges();
                return Ok(new {mess = "Success"});
            }
            else
            {
                return Ok(new { mess = "PASSWORD KO TRÙNG KHỚP" });
            }
        }
        private void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        [HttpPost("Login")]
        public IActionResult Login(AccountDto request)
        {
            var myAccount = _accountRepository.CheckExist(request.email);
            if (myAccount == null)
            {
                return Ok("NOT FOUND YOUR ACCOUNT");
            }
            if (!VerifyPassword(request.password, myAccount.PasswordHash, myAccount.PasswordSalt)) 
            {
                return BadRequest("INCORRECT PASSWORD");
            }

            string token = CreateToken(myAccount);

            /*var refreshToken = CreateRefreshToken();

            SetRefreshToken(myAccount, refreshToken);*/

            return Ok(token);
        }

       /* [HttpPost("RefreshToken")]
        public IActionResult RefreshMyToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!account.refreshToken.Equals(refreshToken))
            {
                return Unauthorized("TOKEN INVALID");
            }
            else if (account.tokenExpires < DateTime.Now)
            {
                return Unauthorized("TOKEN EXPIRED");
            }
            string token = CreateToken(account);
            var newRefreshToken = CreateRefreshToken();
            SetRefreshToken(newRefreshToken);
            return Ok(token);
        }*/

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
        private string CreateToken(AccountEntity account)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, account.UserId.ToString()),
                new Claim(ClaimTypes.Email, account.Email),
/*                new Claim(ClaimTypes.Role, "User"), account -> user -> role, 1 user có nhiều Role thì nó là một mảng .. ??? */ 
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;

        }

        private RefreshToken CreateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };
            return refreshToken;
        }

        private void SetRefreshToken(AccountModel acc, RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            acc.refreshToken = newRefreshToken.Token;
            acc.tokenCreated = newRefreshToken.Created;
            acc.tokenExpires = newRefreshToken.Expires;
        }
    }
}
