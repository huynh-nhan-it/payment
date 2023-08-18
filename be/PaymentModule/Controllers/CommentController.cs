using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentModule.DTOs;
using PaymentModule.Services.Implements;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private IDetailRequestService _detailRequestService;

        public CommentController(IDetailRequestService detailRequestService)
        {
            _detailRequestService = detailRequestService;
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
                return Ok(cmtDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
