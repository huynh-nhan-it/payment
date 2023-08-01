using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.IServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Threading;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddFakeDataController : ControllerBase
    {
        private IDetailRequestService _detailRequestService;
        private readonly PaymentContext _context;
        private readonly ConnectionStringSettings _connectionStringSettings;

        private Random random = new Random();
        public AddFakeDataController(IDetailRequestService a, PaymentContext s, ConnectionStringSettings connectionStringSettings)
        {
            _detailRequestService = a;
            _context = s;
            _connectionStringSettings = connectionStringSettings;
        }

        [HttpPost("fake-data-user")]
        public IActionResult GetAllCommentByDRid()
        {
            string filePath = Path.Combine("data", "Approver.txt");
            return Ok(ReadApproverDataFile(filePath));
            
        }

        [HttpPost()]
        public IActionResult PostNewComment(CommentDto cmtDto)
        {
            try
            {
                _detailRequestService.PostComment(cmtDto);
                return Ok();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }

        private string ReadAndProcessTextFile(string filePath)
        {
            string insertSql = "insert into DepartmentBear(Id, CostCenter, Department) values ";
            // Mở file và tạo một đối tượng StreamReader để đọc nội dung
            using (StreamReader sr = new StreamReader(filePath))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    string costCenter = line.Substring(0, 4);
                    string departmentName = line.Substring(5);
                    var id = Guid.NewGuid();
                    var departBear = new DepartmentBearModel
                    {
                        CostCenter = costCenter, // Loại bỏ các khoảng trắng thừa
                        Department = departmentName // Loại bỏ các khoảng trắng thừa
                    };
                    insertSql += "('" + id + "', '" + departBear.CostCenter + "', N'" + departBear.Department + "'),\n";

                }

                return insertSql;

            }

        }


        private List<Object> ReadApproverDataFile(string filePath)
        {
/*            List<string> listApproverData = new List<string>();
*/            string s = "";
            string result = "";
            List<Object> listString = new List<Object>();
            using (StreamReader sr = new StreamReader(filePath))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    string[] list1 = line.Split("[");
                    string[] list2 = list1[1].Split("]");
                    result = list2[0];
                    string[] useInfo = result.Split(", ");
                    
                    if (useInfo.Length == 3)
                    {
                        string[] fullname = useInfo[0].Split(" ");
                        string firstName = "";
                        string lastName = "";
                        for (int i = 0; i < fullname.Length; i++)
                        {
                            if (i == 0)
                            {
                                firstName = fullname[i];
                            } else
                            {  
                                lastName += fullname[i] + " ";
                            }
                        }

                        string phoneNumber = "0" + GenerateRandomPhoneNumber();

                        string passWord = useInfo[1].Split("@")[1] + "123";
                        string avatar = "";

                        Guid theUId = Guid.NewGuid();
                        Guid theAId = Guid.NewGuid();

                        var userEntity = new UserEntity
                        {
                            Id = theUId,
                            FirstName = firstName,
                            LastName = lastName,
                            Email = useInfo[1],
                            PhoneNumber = phoneNumber,
                            Avatar = avatar,
                            AccountId = theAId,
                            JobTitle = useInfo[2],
                        };
                        _context.Users.Add(userEntity);
                        _context.SaveChanges();


                        HashPassword(passWord, out byte[] passwordHash, out byte[] passwordSalt);

                        var accountEntity = new AccountEntity
                        {
                            Id = theAId,
                            Email = useInfo[1],
                            PasswordHash = passwordHash,
                            PasswordSalt = passwordSalt,
                            UserId = theUId
                        };

                        _context.Accounts.Add(accountEntity);
                        _context.SaveChanges();

                        Guid StaffId = new Guid("20C3348C-AF49-4E8F-9FCD-0B0E0B295A28");
                        SetRoleForUser(theUId, StaffId);
                        listString.Add(new {firstName, lastName , email = useInfo[1], phoneNumber, jobTitle = useInfo[2] });
                    }
                }
            }

            return listString;
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
        private void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private string GenerateRandomPhoneNumber()
        {
            string phoneNumber = "0";

            // Generate the first digit of the phone number (0 or 1 for area code)
            phoneNumber += random.Next(2).ToString();

            // Generate the remaining 9 digits of the phone number
            for (int i = 0; i < 9; i++)
            {
                phoneNumber += random.Next(10).ToString();
            }

            // Format the phone number with dashes (optional)
            phoneNumber = FormatPhoneNumber(phoneNumber);

            return phoneNumber;
        }

        private string FormatPhoneNumber(string phoneNumber)
        {
            return string.Format("{0:0##.###.###}", long.Parse(phoneNumber));
        }
    }
}

    



