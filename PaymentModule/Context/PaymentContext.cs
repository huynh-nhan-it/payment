using Microsoft.EntityFrameworkCore;
using PaymentModule.Entities;
using System.Numerics;

namespace PaymentModule.Context
{
    public class PaymentContext : DbContext
    {
        public PaymentContext() { }

        public PaymentContext(DbContextOptions<PaymentContext> options)
            : base(options)
        {
        }
        public virtual DbSet<AccountEntity> Accounts { get; set; }
        public virtual DbSet<UserEntity> Users { get; set; }
        public virtual DbSet<RoleEntity> Roles { get; set; }
        public virtual DbSet<StatusEntity> Statuses { get; set; }
        public virtual DbSet<PaymentRequestEntity> PaymentRequests { get; set; }
        public virtual DbSet<DetailRequestEntity> DetailRequests { get; set; }
        public virtual DbSet<DepartmentEntity> Departments { get; set; }
        public virtual DbSet<SupplierEntity> Suppliers { get; set; }
        public virtual DbSet<CurrencyEntity> Currencies { get; set; }
        public virtual DbSet<AttachmentEntity> Attachments { get; set; }
        public virtual DbSet<PaymentMethodEntity> PaymentMethods { get; set; } 
        public virtual DbSet<OverviewEntity> Overviews { get; set; }
        public virtual DbSet<AdditionalEntity> Additionals { get; set; }
        public virtual DbSet<ContractEntity> Contracts { get; set; }
        public virtual DbSet<FamilyEntity> Families { get; set; }
        public virtual DbSet<RelationshipEntity> Relationships { get; set; }
        public virtual DbSet<SignatureEntity> Signatures { get; set; }
        public virtual DbSet<DetailTableEntity> DetailTables { get; set; }
        public virtual DbSet<BankEntity> Banks { get; set; }
        public virtual DbSet<TotalPaymentEntity> TotalPayments { get; set; }

        /* public List<RoleEntity> ExecuteRawSql(string sql)
         {
             return RoleEntity.Fro
         }*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Thiết lập mối quan hệ 1-1
            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.MyAccount)
                .WithOne(a => a.MyUser)
                .HasForeignKey<AccountEntity>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DetailRequestEntity>()
                .HasOne(u => u.TotalPayment)
                .WithOne(a => a.DetailRequest)
                .HasForeignKey<TotalPaymentEntity>(a => a.DetailRequestID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DetailRequestEntity>()
                .HasOne(u => u.PaymentRequest)
                .WithOne(a => a.DetailRequest)
                .HasForeignKey<PaymentRequestEntity>(a => a.DetailRequestId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DetailRequestEntity>()
                .HasOne(u => u.Bank)
                .WithOne(a => a.DetailRequest)
                .HasForeignKey<BankEntity>(a => a.DetailRequestId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.Overview)
                .WithOne(a => a.User)
                .HasForeignKey<OverviewEntity>(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.Additional)
                .WithOne(a => a.User)
                .HasForeignKey<AdditionalEntity>(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserEntity>()
               .HasOne(u => u.Family)
               .WithOne(a => a.User)
               .HasForeignKey<FamilyEntity>(a => a.UserId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.Signature)
                .WithOne(a => a.User)
                .HasForeignKey<SignatureEntity>(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //Thiết lập mối quan hệ 1-n

            modelBuilder.Entity<AdditionalEntity>()
               .HasMany(u => u.contracts)
               .WithOne()
               .HasForeignKey(r => r.AddtionalId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FamilyEntity>()
               .HasMany(u => u.relationships)
               .WithOne()
               .HasForeignKey(r => r.FamilyId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StatusEntity>()
               .HasMany(u => u.PaymentRequests)
               .WithOne()
               .HasForeignKey(r => r.StatusId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserEntity>()
                .HasMany(u => u.PaymentRequests)
                .WithOne()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DepartmentEntity>()
               .HasMany(u => u.DetailRequests)
               .WithOne()
               .HasForeignKey(r => r.DepartmentId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SupplierEntity>()
               .HasMany(u => u.DetailRequests)
               .WithOne()
               .HasForeignKey(r => r.SupplierId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CurrencyEntity>()
               .HasMany(u => u.DetailRequests)
               .WithOne()
               .HasForeignKey(r => r.CurrencyId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DetailRequestEntity>()
               .HasMany(u => u.Attachments)
               .WithOne()
               .HasForeignKey(r => r.DetailRequestId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PaymentMethodEntity>()
               .HasMany(u => u.DetailRequests)
               .WithOne()
               .HasForeignKey(r => r.PaymentMethodId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DepartmentEntity>()
              .HasMany(u => u.DetailTables)
              .WithOne()
              .HasForeignKey(r => r.DepartmentTableId)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DetailRequestEntity>()
               .HasMany(u => u.DetailRequestTables)
               .WithOne()
               .HasForeignKey(r => r.DetailRequestId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SupplierEntity>()
               .HasMany(u => u.Banks)
               .WithOne()
               .HasForeignKey(r => r.SupplierID)
               .OnDelete(DeleteBehavior.Cascade);

            //Thiết lập mối quan hệ n-n 
            modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity<Dictionary<string, object>>(
                "UserRole",
                j => j.HasOne<RoleEntity>().WithMany().HasForeignKey("RoleId").OnDelete(DeleteBehavior.Cascade),
                j => j.HasOne<UserEntity>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.Cascade)
            );

            modelBuilder.Entity<DetailRequestEntity>()
                .HasMany(u => u.Approvers)
                .WithMany(r => r.DetailRequests)
                .UsingEntity<Dictionary<string, object>>(
                    "ApproverDetailRequest",
                    j => j.HasOne<UserEntity>().WithMany().HasForeignKey("ApproverId").OnDelete(DeleteBehavior.Cascade),
                    j => j.HasOne<DetailRequestEntity>().WithMany().HasForeignKey("DetailRequestId").OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.Property<int>("Queue").HasColumnType("int");
                        j.Property<string>("Status").HasColumnType("varchar(255)");
                        j.HasKey("DetailRequestId", "ApproverId", "Queue", "Status");
                    }
                );
        

        }
    }
}
