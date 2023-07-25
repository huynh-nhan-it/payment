﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentModule.Entities
{
    public class DetailRequestEntity
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Purpose { get; set; }
        public string PaymentFor { get; set; }
        public double ExchangeRate { get; set; }
        public int PONumber { get; set; }
        public PaymentRequestEntity PaymentRequest { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid SupplierId { get; set; }
        public Guid CurrencyId { get; set; } 
        public ICollection<AttachmentEntity>? Attachments { get; set; }
        public ICollection<UserEntity> Approvers { get; set; }
        public ICollection<DetailTableEntity> DetailRequestTables { get; set; }
        public Guid PaymentMethodId { get; set; }
        public TotalPaymentEntity TotalPayment { get; set; }
        public BankEntity Bank { get; set; }
        public ICollection<CommentEntity> Comments { get; set; }
    }
}

