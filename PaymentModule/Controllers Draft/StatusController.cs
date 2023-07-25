using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.DTOs;
using PaymentModule.Models;
using PaymentModule.Services.IServices;
using System;
using System.Collections.Generic;
using System.IO;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private IDetailRequestService _detailRequestService;
        private Random random = new Random();
        public StatusController(IDetailRequestService a)
        {
            _detailRequestService = a;
        }

        [HttpGet()]
        public IActionResult GetAllCommentByDRid()
        {
            return Ok(ReadApproverDataFile("C:\\Users\\84961\\Desktop\\Intern_Opus_Solution\\project\\payment\\PaymentModule\\data\\Approver.txt"));
            
        }

        [HttpPost]
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
                    
                    string[] fullname = useInfo[0].Split(" ");
                    string firstName = "";
                    string lastName = "";
                    for(int i = 0; i < fullname.Length; i++) { 
                        if(i == 0)
                        {
                            firstName = fullname[i];
                        }
                        lastName += fullname[i] + " ";
                    }

                    string phoneNumber = "0" + GenerateRandomPhoneNumber();
                    if (useInfo.Length == 3)
                    {
                        listString.Add(new {firstName, lastName , email = useInfo[1], phoneNumber, jobTitle = useInfo[2] });
                    }
                }
            }

            return listString;

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

    



