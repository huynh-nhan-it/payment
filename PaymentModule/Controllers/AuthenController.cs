using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PaymentModule.DTOs;
using PaymentModule.Models;
using PaymentModule.Repository;
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
        private readonly IConfiguration _config;
        private readonly IAccountRepository _accountRepository;
        public AuthenController(IConfiguration configuration, IAccountRepository accountRepository)
        {
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
            if (request.password == request.confirmPassword) {
                var userModel = new UserModel();
                userModel.firstName = request.firstName;
                userModel.lastName = request.lastName;
                userModel.email = request.email;
                userModel.password = request.password;
                userModel.phoneNumber = request.phoneNumber;
                users.Add(userModel);

                hashPassword(request.password, out byte[] passwordHash, out byte[] passwordSalt);

                var accountModel = new AccountModel
                {
                    email = request.email,
                    passwordHash = passwordHash,
                    passwordSalt = passwordSalt
                };
                accounts.Add(accountModel);
                return Ok(accounts);
            } else
            {
                return Ok(new { mess = "PASSWORD KO TRÙNG KHỚP" });
            }
            
        }
        private void hashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
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
            var myAccount = accounts.SingleOrDefault(acc => acc.email == request.email);
            if (myAccount == null)
            {
                return Ok("NOT FOUND YOUR ACCOUNT");
            }
            if (!VerifyPassword(request.password, myAccount.passwordHash, myAccount.passwordSalt))
            {
                return BadRequest("INCORRECT PASSWORD");
            }

            string token = CreateToken(myAccount);

            var refreshToken = CreateRefreshToken();
            
            SetRefreshToken(myAccount, refreshToken);
        
            return Ok(new { token , refreshToken});
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

        private string CreateToken(AccountModel account)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, account.email),
                new Claim(ClaimTypes.Role, "Admin"),
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
