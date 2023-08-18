/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Models;
using System.Collections.Generic;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SelectPRController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            string connectionString = "Data Source=DESKTOP-3VU8FT9\\SQLEXPRESS01;Initial Catalog=PaymentDB;Integrated Security=True";
            string selectQuery = "SELECT DISTINCT  pr.RequestCode, pr.UserId, pr.CreateAt, pr.StatusId, \r\ndr.Purpose, dr.DepartmentId, dr.PaymentFor, dr.SupplierId, dr.CurrencyId, dr.PONumber, \r\ndt.Id as DtId, dt.InvDate, dt.PaymentContent, dt.Amount, dt.InvNo, dt.Industry, dt.DepartmentTableId, dt.Note,\r\npm.Id as PmId,\r\nadr.ApproverId\r\nFROM DetailRequests AS dr \r\nINNER JOIN DetailTables AS dt ON dr.id = dt.DetailRequestId\r\nINNER JOIN PaymentRequests AS pr ON dr.id = pr.detailrequestid \r\nINNER JOIN PaymentMethods AS pm ON dr.PaymentMethodId = pm.id\r\nINNER JOIN ApproverDetailRequest AS adr ON dr.Id = adr.DetailRequestId\r\nwhere pr.RequestCode = '2023OPS-PAY-000001'";
            List<PaymentRequestDetail> listPaymentRequestDetail = new List<PaymentRequestDetail>();
            List<DetailTableModel> listDetailTable = new List<DetailTableModel>();
            List<Guid> ApproverIdList = new List<Guid>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    connection.Open();

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var a = new DetailTableModel
                            {
                                Id = (Guid)reader["DtId"],
                                InvDate = (DateTime)reader["InvDate"],
                                PaymentContent = (string)reader["PaymentContent"],
                                Amount = (double)reader["Amount"],
                                InvNo = (int)reader["InvNo"],
                                Industry = (string)reader["Industry"],
                                DepartmentTableId = (Guid)reader["DepartmentTableId"],
                                Note = (string)reader["Note"],
                            };
                           
                            if(listDetailTable.SingleOrDefault(dt => dt.Id.Equals(a.Id)) == null)
                            {
                                listDetailTable.Add(a);
                            }
                           
                            if(!ApproverIdList.Contains((Guid)reader["ApproverId"]))
                            {
                                ApproverIdList.Add((Guid)reader["ApproverId"]);
                            }
                           
                            var b = new PaymentRequestDetail
                            {
                                RequestCode = (string)reader["RequestCode"],

                                UserId = (Guid)reader["UserId"],

                                CreateAt = (DateTime)reader["CreateAt"],
                                StatusId = (Guid)reader["StatusId"],
                                Purpose = (string)reader["Purpose"],

                                DepartmentId = (Guid)reader["DepartmentId"], //

                                PaymentFor = (string)reader["PaymentFor"],

                                SupplierId = (Guid)reader["SupplierId"], //

                                CurrencyId = (Guid)reader["CurrencyId"], //

                                PONumber = (int)reader["PONumber"],

                                TableDetailRequest = listDetailTable,

                                MethodId = (Guid)reader["PmId"], //

                                ApproverId = ApproverIdList, //
                            };
                            listPaymentRequestDetail.Add(b);
                        }                      
                    }
                }
            }
            return Ok(listPaymentRequestDetail[listPaymentRequestDetail.Count - 1]);
        }          
    }
}
*/