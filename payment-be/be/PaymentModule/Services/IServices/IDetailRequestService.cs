using Microsoft.AspNetCore.Mvc;
using PaymentModule.DTOs;
using PaymentModule.Models;

namespace PaymentModule.Services.IServices
{
    public interface IDetailRequestService
    {
        public string GetPurposeById(Guid id);
        public List<CommentModel> GetCommentList(Guid id);
        public void PostComment(CommentDto comment);
        public Guid GetDRidByRequestCode(string requestCode);
        public ObjectResult HandleApprovers(List<ApproverDto> approvers, Guid requestId);
        public ObjectResult HandleDetailTable(List<DetailTableDto> Table, Guid requestId);
        public ObjectResult HandleTotalPayment(TotalPaymentDto request, Guid theId);
    }
}
