using Microsoft.AspNetCore.Mvc;
using PaymentModule.Services;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using PaymentModule.Context;
using PaymentModule.DTOs;
using Newtonsoft.Json;
using System.Security.Cryptography.X509Certificates;
using PaymentModule.Entities;
using System.Reflection.Metadata;
using System.Net.WebSockets;
using Microsoft.Extensions.Options;
using PaymentModule.Services.IServices;

namespace PaymentModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public IUserService _userService;
        public PaymentContext _context;
        public IPersonalService _personalService;

        public PersonalController(PaymentContext paymentContext, IUserService userService,
            IConfiguration configuration, IPersonalService personalService)
        {
            _context = paymentContext;
            _configuration = configuration;
            _userService = userService;
            _personalService = personalService;
        }

        [HttpGet("EmployeeInfo")]

        public IActionResult GetInforEmployee(Guid Id)
        {
            string token = "";
            var userId = Id.ToString() == "" ? "A3E4D297-29AE-42F8-A2F7-9D511F31B0B9" : Id.ToString();
            string authorizationHeader = Request.Headers["Authorization"];
            var options = new JsonSerializerOptions { WriteIndented = true, ReferenceHandler = ReferenceHandler.Preserve };


            /*if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                string secretKey = _configuration["AppSettings:Token"];
                token = authorizationHeader.Substring("Bearer ".Length);
                userId = _userService.DecodeToken(token, secretKey);
                if (userId == "") { return BadRequest(new ObjectResult(new { success = false, error = true, message = "Process get token has error" })); }
            }
            else { return BadRequest(new { success = false, error = true, message = "Token not found in header" }); }*/
            var userWithDetails = _context.Users
                    .Include(u => u.Overview)
                    .Include(u => u.Additional)
                    .Include(u => u.Family)
                    .Include(u => u.Signature)
                    .Include(u => u.Additional.contracts)
                    .Include(u => u.Family.relationships)
                    .FirstOrDefault(u => u.Id.ToString() == userId);

            if (userWithDetails == null)
            {
                return BadRequest("User was not found");
            }

            var InfoUser = System.Text.Json.JsonSerializer.Serialize(new { userInfo = userWithDetails }, options);
            string formattedJson = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(InfoUser), Formatting.Indented);


            return Ok(formattedJson);
        }


        private ObjectResult HandleOverview (OverviewDto overview, Guid Id)
        {
            var overviewToUpdate = _context.Overviews.FirstOrDefault(o => o.UserId.Equals(Id));

            if (overviewToUpdate != null)
            {
                overviewToUpdate.Rank = overview.Rank;
                overviewToUpdate.EmployeeType = overview.EmployeeType;
                _context.Overviews.Update(overviewToUpdate);
                return new ObjectResult(new { overviewToUpdate, success = true, error = false, message = "Cập nhật thông tin Overview thành công" }); 
            }
            return new ObjectResult(new { success = false, error = true, message = "Cập nhật thông tin overview thất bại" }) ; 
        }

        private ObjectResult HandleAdditional(AdditionalDto additional, Guid Id)
        {
            var additionalToUpdate = _context.Additionals.FirstOrDefault(a => a.UserId.Equals(Id));
            var user = _context.Users.FirstOrDefault(u => u.Id.Equals(Id));
            ICollection<ContractDto> contracts = JsonConvert.DeserializeObject<List<ContractDto>>(additional.Contracts == null ? "[]" : additional.Contracts);
            ICollection<ContractEntity> contractEntities = new List<ContractEntity>();

            if (additionalToUpdate != null && user != null)
            {
                additionalToUpdate.Nation = additional.Nation;
                user.PhoneNumber = additional.Phone == null ? user.PhoneNumber : additional.Phone;
                additionalToUpdate.IDCardNumber = additional.IDCardNumber;
                additionalToUpdate.DateOfIDCard = additional.DateOfIDCard;
                additionalToUpdate.PlaceOfIDCard = additional.PlaceOfIDCard;
                additionalToUpdate.StartingDate = additional.StartingDate;
                additionalToUpdate.Note = additional.Note;
                additionalToUpdate.AcademicLevel = additional.AcademicLevel;
                additionalToUpdate.SpecializedQualification = additional.SpecializedQualification;
                additionalToUpdate.BusinessPhone = additional.BusinessPhone;
                additionalToUpdate.HomePhone = additional.HomePhone;
                additionalToUpdate.PersonalEmail = additional.PersonalEmail;
                additionalToUpdate.BankName = additional.BankName;
                additionalToUpdate.BranchNumber = additional.BranchNumber;
                additionalToUpdate.BankBranchName = additional.BankBranchName;
                additionalToUpdate.BankAccountName = additional.BankAccountName;
                additionalToUpdate.Street = additional.Street;
                additionalToUpdate.BuildingOrFlatNumber = additional.BuildingOrFlatNumber;
                additionalToUpdate.City = additional.City;
                additionalToUpdate.ProvinceOrState = additional.ProvinceOrState;
                additionalToUpdate.PostalCode = additional.PostalCode;
                additionalToUpdate.Country = additional.Country;
                foreach(ContractDto contract in contracts)
                {
                    ContractEntity contractEntity = new ContractEntity
                    {
                        AddtionalId = additionalToUpdate.Id,
                        ContractType = contract.ContractType,
                        FromDate = contract.FromDate,
                        ToDate = contract.ToDate,
                        SigningDate = contract.SigningDate,
                        Subject = contract.Subject,
                        Department = contract.Department,
                        Note = contract.Note,
                    };
                    contractEntities.Add(contractEntity);
                }
                additionalToUpdate.contracts = contractEntities;

                _context.Users.Update(user);
                _context.Additionals.Update(additionalToUpdate);

                return new ObjectResult(new { additionalToUpdate, success = true, error = false, message = "Cập nhật thông tin Additional thành công" });
            }
            return new ObjectResult(new { success = false, error = true, message = "Cập nhật thông tin Additional thất bại" });
        }

        private ObjectResult HandleFamily(FamilyDto family, Guid Id)
        {
            var FamilyToUpdate = _context.Families.FirstOrDefault(f => f.UserId.Equals(Id));
            ICollection<RelationshipDTO> relationships = JsonConvert.DeserializeObject<List<RelationshipDTO>>(family.relationships == null ? "[]" : family.relationships);
            ICollection<RelationshipEntity> relationshipEntities = new List<RelationshipEntity>();

            if (FamilyToUpdate != null)
            {
                FamilyToUpdate.MartialStatus = family.MartialStatus;
                FamilyToUpdate.ContactName = family.ContactName;
                FamilyToUpdate.Relationship = family.Relationship;
                FamilyToUpdate.Phone = family.PhoneFamily;
                FamilyToUpdate.Street = family.StreetFamily;
                FamilyToUpdate.BuildingOrFlatNumber = family.BuildingOrFlatNumberFamily;
                FamilyToUpdate.City = family.CityFamily;
                FamilyToUpdate.ProvinceOrState = family.ProvinceOrStateFamily;
                FamilyToUpdate.PostalCode = family.PostalCodeFamily;
                FamilyToUpdate.Country = family.CountryFamily;

                foreach (RelationshipDTO relationship in relationships)
                {
                    RelationshipEntity relationshipEntity = new RelationshipEntity
                    {
                        ContactName = relationship.ContactName,
                        BirthDay = relationship.BirthDay,
                        Relationship = relationship.Relationship,
                        Note = relationship.NoteFamily
                    };
                    relationshipEntities.Add(relationshipEntity);
                }
                FamilyToUpdate.relationships = relationshipEntities;
                _context.Families.Update(FamilyToUpdate);
                return new ObjectResult(new { FamilyToUpdate, success = true, error = false, message = "Cập nhật thông tin Family thành công" });
            }
            return new ObjectResult(new { success = false, error = true, message = "Cập nhật thông tin Family thất bại" });

        }

        private async Task<ObjectResult> HandleSignature(SignatureDto signature, Guid Id)
        {
            var HandleImagePath = await _personalService.HandleFile(signature.ImageSignature, Id, "Signature");
            var result = HandleImagePath.Value as dynamic;

            if (result?.error) {
                return new ObjectResult(result);
            }

            var SignatureToUpdate = _context.Signatures.FirstOrDefault(s => s.UserId.Equals(Id));

            if (SignatureToUpdate != null)
            {
                SignatureToUpdate.QRcode = signature.QRcode;
                SignatureToUpdate.dateTime = DateTime.Now;
                SignatureToUpdate.ImagePath = result.fileNamePath == null ? SignatureToUpdate.ImagePath : result.fileNamePath;

                _context.Signatures.Update(SignatureToUpdate);
                return new ObjectResult(new { SignatureToUpdate, success = true, error = false, message = "Cập nhật thông tin Signature thành công" });
            }
            return new ObjectResult(new { success = false, error = true, message = "Cập nhật thông tin Signature thất bại" });
        }

        [HttpPut("EditInfoEmployee")]
        public async Task<IActionResult> UpdateInfoEmployee([FromForm] PersonalDto personal, Guid Id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id.Equals(Id));
            if (user == null ) { return BadRequest("User was not found"); }
            var options = new JsonSerializerOptions { WriteIndented = true, ReferenceHandler = ReferenceHandler.Preserve };

            IFormFile Avatar = personal.Avatar;
            string Rank = personal.overview.Rank;
            string EmployeeType = personal.overview.EmployeeType;

            string Nation = personal.additional.Nation;
            string Phone = personal.additional.Phone;
            string IDCardNumber = personal.additional.IDCardNumber;
            DateTime DateOfIdCard = personal.additional.DateOfIDCard == null ? DateTime.Now : (DateTime)personal.additional.DateOfIDCard;
            string PlaceOfIDCard = personal.additional.PlaceOfIDCard;
            DateTime StartingDate = personal.additional.StartingDate == null ? DateTime.Now : (DateTime)personal.additional.StartingDate;
            string Note = personal.additional.Note;
            string AcademicLevel = personal.additional.AcademicLevel;
            string SpecializedQualification = personal.additional.SpecializedQualification;
            string BusinessPhone = personal.additional.BusinessPhone;
            string HomePhone = personal.additional.HomePhone;
            string PersonalEmail = personal.additional.PersonalEmail;
            string BankName = personal.additional.BankName;
            string BranchNumber = personal.additional.BranchNumber;
            string BankBranchName = personal.additional.BankBranchName;
            string BankAccountNumber = personal.additional.BankAccountNumber;
            string BankAccountName = personal.additional.BankAccountName;
            string Street = personal.additional.Street;
            string BuildingOrFlatNumber = personal.additional.BuildingOrFlatNumber;
            string City = personal.additional.City;
            string ProvinceOrState = personal.additional.ProvinceOrState;
            string PostalCode = personal.additional.PostalCode;
            string Country = personal.additional.Country;
            string contracts = personal.additional.Contracts;


            string MartialStatus = personal.family.MartialStatus;
            string ContactName = personal.family.ContactName;
            string Relationship = personal.family.Relationship;
            string PhoneFamily = personal.family.PhoneFamily;
            string StreetFamily = personal.family.StreetFamily;
            string BuildingOrFlatNumberFamily = personal.family.BuildingOrFlatNumberFamily;
            string CityFamily = personal.family.CityFamily;
            string ProvinceOrStateFamily = personal.family.ProvinceOrStateFamily;
            string PostalCodeFamily = personal.family.PostalCodeFamily;
            string CountryFamily = personal.family.CountryFamily;
            string relationships = personal.family.relationships;

            string QRcode = personal.signature.QRcode;
            IFormFile ImageSignature = personal.signature.ImageSignature;


            OverviewDto overview = new OverviewDto
            {
                Rank = Rank,
                EmployeeType = EmployeeType,
            };

            AdditionalDto additional = new AdditionalDto
            {
                Nation = Nation,
                Phone = Phone,
                IDCardNumber = IDCardNumber,
                DateOfIDCard = DateOfIdCard,
                PlaceOfIDCard = PlaceOfIDCard,
                StartingDate = personal.additional.StartingDate,
                Note = Note,
                AcademicLevel = AcademicLevel,
                SpecializedQualification = SpecializedQualification,
                BusinessPhone = BusinessPhone,
                HomePhone = HomePhone,
                PersonalEmail = PersonalEmail,
                BankName = BankName,
                BranchNumber = BranchNumber,
                BankBranchName = BankBranchName,
                BankAccountNumber = BankAccountNumber,
                BankAccountName = BankAccountName,
                Street = Street,
                BuildingOrFlatNumber = BuildingOrFlatNumber,
                City = City,
                ProvinceOrState = ProvinceOrState,
                PostalCode = PostalCode,
                Country = Country,
                Contracts = contracts
             };

            FamilyDto family = new FamilyDto
            {
                MartialStatus = MartialStatus,
                ContactName = ContactName,
                Relationship = Relationship,
                PhoneFamily = PhoneFamily,
                StreetFamily = StreetFamily,
                BuildingOrFlatNumberFamily = BuildingOrFlatNumberFamily,
                CityFamily = CityFamily,
                ProvinceOrStateFamily = ProvinceOrStateFamily,
                PostalCodeFamily = PostalCodeFamily,
                CountryFamily = CountryFamily,
                relationships = relationships,
            };

            SignatureDto signature = new SignatureDto
            {
                QRcode = QRcode,
                ImageSignature = ImageSignature,
            };

            var resultHandleOverview = HandleOverview(overview, Id).Value as dynamic;
            var resultHandleAdditional = HandleAdditional(additional, Id).Value as dynamic;
            var resultHandleFamily = HandleFamily(family, Id).Value as dynamic;
            var asyncHandleSignature = await HandleSignature(signature, Id);
            var resultHandleSignature = asyncHandleSignature.Value as dynamic;
            var asyncHandleAvatar = await _personalService.HandleFile(Avatar, Id, "Avatar");
            var resultHandleAvatar = asyncHandleAvatar.Value as dynamic;
        

            if (resultHandleSignature?.error || resultHandleAdditional?.error || resultHandleFamily?.error || resultHandleOverview?.error || resultHandleAvatar?.error)
            {
                string err = "";
                if (resultHandleSignature?.error)
                {
                    err = resultHandleSignature.message;
                }
                if (resultHandleAdditional?.error)
                {
                    err = resultHandleAdditional.message;
                }
                if (resultHandleFamily?.error)
                {
                    err = resultHandleFamily.message;
                }

                if (err != "" && (resultHandleAvatar?.success || resultHandleAvatar?.success))
                {
                    string name = "signature";
                    if (resultHandleAvatar?.success) { name = "avatar"; }
                    var filePath = Path.Combine("data/image/" + name, Id.ToString());
                    if (Directory.Exists(filePath)) { Directory.Delete(filePath, true); }

                    if (resultHandleAvatar?.success && resultHandleAvatar?.success)
                    {
                        var fileSignaturePath = Path.Combine("data/image/signature" + name, Id.ToString());
                        if (Directory.Exists(fileSignaturePath) ) { Directory.Delete(fileSignaturePath, true); }
                    }
                }

                if (resultHandleAvatar?.error)
                {
                    err = resultHandleAvatar.message;
                }

                if (resultHandleSignature?.error)
                {
                    err = resultHandleSignature.message;
                }
                return BadRequest(new {err});
            }

            user.Avatar = resultHandleAvatar.fileNamePath == null ? user.Avatar : resultHandleAvatar.fileNamePath;
            user.Overview = resultHandleOverview.overviewToUpdate;
            user.Additional = resultHandleAdditional.additionalToUpdate;
            user.Family = resultHandleFamily.FamilyToUpdate;
            user.Signature = resultHandleSignature.SignatureToUpdate;

            _context.Users.Update(user);
            _context.SaveChanges();

            var userWithDetails = _context.Users
                   .Include(u => u.Overview)
                   .Include(u => u.Additional)
                   .Include(u => u.Family)
                   .Include(u => u.Signature)
                   .Include(u => u.Additional.contracts)
                   .Include(u => u.Family.relationships)
                   .FirstOrDefault(u => u.Id.Equals(Id));

            if (userWithDetails == null)
            {
                return BadRequest("User was not found");
            }

            var InfoUser = System.Text.Json.JsonSerializer.Serialize(new { userInfo = userWithDetails }, options);
            string formattedJsonInfoUser = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(InfoUser), Formatting.Indented);

            return Ok(formattedJsonInfoUser);
        }

    }
}
