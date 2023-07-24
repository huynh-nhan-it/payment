using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;
using PaymentModule.Entities;
using PaymentModule.Models;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class DetailRequestService : IDetailRequestService
    {
        private PaymentContext _context;
        private IUserService _userService;
        private IDepartmentBearService _departmentBearService;
        private readonly ConnectionStringSettings _connectionStringSettings;
        private object ParentId;


        public DetailRequestService(PaymentContext context, IUserService userService, IDepartmentBearService departmentBearService)
        {
            _context = context;
            _userService = userService;
            _departmentBearService = departmentBearService;
        }

        List<CommentModel> IDetailRequestService.GetCommentList(Guid DetailRequestId)
        {
            List<CommentModel> cmtModelList = new List<CommentModel>();
            List<CommentEntity> cmtEntiList = _context.Comments.ToList();
            foreach(var cmtEnti in cmtEntiList)
            {
                if(cmtEnti.DetailRequestId.Equals(DetailRequestId) == true && cmtEnti.ParentId.Equals(new Guid()) == true)
                {
                    var userModel = _userService.GetUserModelById(cmtEnti.UserId);
                    var CommentModel = new CommentModel
                    {
                        UserModel = userModel,
                        CreateAt = cmtEnti.CreateAt,
                        Content = cmtEnti.Content,
                        CommentReplyList = GetCommentReplyList(cmtEnti.Id, DetailRequestId),
                    };
                    cmtModelList.Add(CommentModel);
                }
            }
            return cmtModelList;
        }

        private List<CommentModel> GetCommentReplyList(Guid ParentCmtId, Guid DetailRequestId)
        {
            List<CommentModel> cmtModelList = new List<CommentModel>();
            List<CommentEntity> cmtEntiList = _context.Comments.ToList();
            foreach (var cmtEnti in cmtEntiList)
            {
                if (cmtEnti.ParentId.Equals(ParentCmtId) == true && cmtEnti.DetailRequestId.Equals(DetailRequestId) == true)
                {
                    var userModel = _userService.GetUserModelById(cmtEnti.UserId);
                    var CommentModel = new CommentModel
                    {
                        UserModel = userModel,
                        CreateAt = cmtEnti.CreateAt,
                        Content = cmtEnti.Content,
                    };
                    cmtModelList.Add(CommentModel);
                }
            }
            return cmtModelList;
        }

        Guid IDetailRequestService.GetDRidByRequestCode(string requestCode)
        {
            Guid detailRequestId = new Guid();
            var paymentRequest = _context.PaymentRequests.SingleOrDefault(pr => pr.RequestCode.Contains(requestCode) == true);
            if(paymentRequest != null)
            {
                detailRequestId = paymentRequest.DetailRequestId;
            }
            return detailRequestId;
        }

        string IDetailRequestService.GetPurposeById(Guid id)
        {
            var detailRequest = _context.DetailRequests.FirstOrDefault(u => u.Id.Equals(id) == true);
            if (detailRequest != null)
            {
                return detailRequest.Purpose;
            }
            return null;
        }


        void IDetailRequestService.PostComment(CommentDto comment)
        {
            Guid userId = comment.UserId;
            Guid detailRequestId = comment.DetailRequestId;
            string content = comment.Content;
            DateTime createdAt = comment.CreatedAt;
            Guid? parentId = comment.ParentId;
            Guid replyCmtId = new Guid();
            if (parentId.HasValue) 
            {
                replyCmtId = parentId.Value;
            }
            var cmtEnti = new CommentEntity
            {
                UserId = userId,
                Content = content,
                CreateAt = createdAt,
                ParentId = replyCmtId,
                DetailRequestId = detailRequestId
            };
            _context.Comments.Add(cmtEnti);
            _context.SaveChanges();

        }

        ObjectResult IDetailRequestService.HandleApprovers(List<ApproverDto> approvers, Guid requestId)
        {
            string connectionString = _connectionStringSettings.ConnectionString;
            string error = "Please enter the required information";
            try
            {
                int queue = 1;
                foreach (ApproverDto approver in approvers)
                {
                    if (approver == null) { return new ObjectResult(new { success = false, error = true, message = error }); }
                    string insertQuery = "INSERT INTO ApproverDetailRequest (ApproverId, DetailRequestId, Queue, Status) VALUES (@ApproverId, @DetailRequestId, @Queue, @Status)";

                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        using (SqlCommand command = new SqlCommand(insertQuery, connection))
                        {
                            // Thay thế các tham số trong câu truy vấn bằng giá trị thực tế
                            command.Parameters.AddWithValue("@DetailRequestId", requestId.ToString());
                            command.Parameters.AddWithValue("@ApproverId", (Guid)_userService.GetId(approver.Email));
                            command.Parameters.AddWithValue("@Queue", queue);
                            if (queue == 1)
                            {
                                command.Parameters.AddWithValue("@Status", "Current");
                            }
                            else
                            {
                                command.Parameters.AddWithValue("@Status", "Waiting");
                            }
                            connection.Open();
                            command.ExecuteNonQuery();
                        }
                    }
                    queue++;
                }
                return new ObjectResult(new { success = true, error = false, });
            }
            catch (Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message });
            }
        }

        ObjectResult IDetailRequestService.HandleDetailTable(List<DetailTableDto> Table, Guid requestId)
        {
            string error_mess = "Please enter the required information";
            ICollection<DetailTableEntity> detailTableEntitys = new List<DetailTableEntity>();
            foreach (DetailTableDto colunm in Table)
            {
                if (colunm.Amount < 0 || colunm.PaymentContent == null)
                {
                    return new ObjectResult(new { success = false, error = true, message = error_mess });
                }
                var detailTableEntity = new DetailTableEntity
                {
                    InvDate = colunm.InvDate,
                    PaymentContent = colunm.PaymentContent,
                    Amount = colunm.Amount,
                    InvNo = colunm.InvNo,
                    Industry = colunm.Industry,
                    DepartmentBearId = _departmentBearService.GetIdByDepartmentBear(colunm.DepartmentBear),
                    Note = colunm.Note,
                    DetailRequestId = requestId,
                };
                detailTableEntitys.Add(detailTableEntity);

            }
            return new ObjectResult(new { detailTableEntity = detailTableEntitys, success = true, error = false });

        }

        ObjectResult IDetailRequestService.HandleTotalPayment(TotalPaymentDto request, Guid theId)
        {
            try
            {
                var totalPayment = new TotalPaymentEntity
                {
                    SuggestedAmount = request.SuggestedAmount,
                    Tax = request.Tax,
                    AdvanceAmount = request.AdvanceAmount,
                    TotalPayment = request.TotalPayment,
                    DetailRequestID = theId,
                };

                return new ObjectResult(new { totalPayment = totalPayment, success = true, error = false });
            }
            catch (Exception e)
            {
                return new ObjectResult(new { success = false, error = true, message = e.Message });
            }
        }

        
    }
}
