using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
using System.Text;

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
        private readonly IUserService _userService;
        private readonly IValidation _validation;
        private readonly ConnectionStringSettings _connectionStringSettings;

        public AuthenController(IConfiguration configuration, IAccountService accountRepository, PaymentContext context , IUserService userService, ConnectionStringSettings connectionStringSettings, IValidation validation)
        {
            _context = context;
            _config = configuration;
            _accountRepository = accountRepository;
            _userService = userService;
            _connectionStringSettings = connectionStringSettings;
            _validation = validation;
        }

        [HttpGet, Authorize(Roles = "STAFF")]
        public IActionResult GetMyAccount()
        {
            return Ok(_accountRepository.GetMyAccount());
        }

       

        [HttpPost("Register")]
        public IActionResult Register(UserDto request)
        {

            bool flag = true;
            flag &= _validation.CheckSpace(request.firstName)
                && _validation.CheckSpace(request.lastName)
                && _validation.CheckSpace(request.email)
                && _validation.CheckSpace(request.password)
                && _validation.CheckSpace(request.phoneNumber);
            if(!flag)
            {
                return Ok("Hãy nhập đầy đủ các thông tin");
            } else
            {
                flag &= _validation.IsAllCharacter(request.firstName)
                     && _validation.IsAllCharacter(request.lastName);
                if(!flag)
                {
                    return Ok("Sai định dạng name");
                } else
                {
                    flag &= _validation.CheckEmail(request.email);
                    if (!flag)
                    {
                        return Ok("Email sai định dạng");
                    }
                    else
                    {
                        flag &= _validation.IsStrongPassword(request.password);
                        if(!flag)
                        {
                            return Ok("Password quá yếu");
                        } 
                    }
                }
            }
                
            if(flag)
            {
                string email = request.email;
                if (_userService.CheckExistByEmail(email))
                {
                    return Ok("Email đã tồn tại");
                }
                if (request.password == request.confirmPassword)
                {
                    Guid theId = Guid.NewGuid();
                    Guid AccountId = Guid.NewGuid();
                    var userEntity = new UserEntity
                    {
                        Id = theId,
                        FirstName = request.firstName,
                        LastName = request.lastName,
                        Email = request.email,
                        PhoneNumber = request.phoneNumber,
                        Avatar = request.avatar,
                        AccountId = AccountId,
                        JobTitle = request.jobTitle,
                    };
                    _context.Users.Add(userEntity);
                    _context.SaveChanges();

                    HashPassword(request.password, out byte[] passwordHash, out byte[] passwordSalt);

                    var accountEntity = new AccountEntity
                    {
                        Id = AccountId,
                        Email = request.email,
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        UserId = theId
                    };

                    _context.Accounts.Add(accountEntity);
                    _context.SaveChanges();

                    Guid StaffId = new Guid("20C3348C-AF49-4E8F-9FCD-0B0E0B295A28");
                    SetRoleForUser(theId, StaffId);
                    return Ok(new { mess = "Success" });
                }
                else
                {
                    return Ok(new { mess = "PASSWORD KO TRÙNG KHỚP" });
                }
            } else
            {
                return Ok("Đăng ký thất bại");
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
                return Ok("INCORRECT PASSWORD");
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
            };

            foreach (string role in _userService.GetRoleList(account.UserId))
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }


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

        private void SetRoleForUser(Guid UserId, Guid RoleId)
        {
            string insertQuery = "insert into UserRole(RoleId, UserId) values (@RoleId, @UserId)";

            using (SqlConnection connection = new SqlConnection(_connectionStringSettings.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                    command.Parameters.AddWithValue("@RoleId", RoleId);
                    command.Parameters.AddWithValue("@UserId", UserId);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        [HttpPost("Log-out")]
        public IActionResult LogOut()
        {
            
            return Ok(_accountRepository.UpdateClaimVersion());
        }
    }
}
