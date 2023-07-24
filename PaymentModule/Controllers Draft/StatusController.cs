using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.DTOs;
using PaymentModule.Models;
using PaymentModule.Services.IServices;
using System;
using System.IO;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private IDetailRequestService _detailRequestService;

        public StatusController(IDetailRequestService a)
        {
            _detailRequestService = a;
        }

        [HttpGet("request-code")]
        public IActionResult GetAllCommentByDRid(string RequestCode)
        {
            try
            {
                Guid DetailRequestId = _detailRequestService.GetDRidByRequestCode(RequestCode);
                return Ok(_detailRequestService.GetCommentList(DetailRequestId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
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
            List<DepartmentBearModel> departments = new List<DepartmentBearModel>();
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
                    departments.Add(departBear);

                }

                return insertSql;

            }

        }
    }
}

    



