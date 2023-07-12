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
        public virtual DbSet<DetailTableEntity> DetailTables { get; set; }
        public virtual DbSet<PaymentMethodEntity> PaymentMethods { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Thiết lập mối quan hệ 1-1
            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.MyAccount)
                .WithOne(a => a.MyUser)
                .HasForeignKey<AccountEntity>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PaymentRequestEntity>()
                .HasOne(u => u.DetailRequest)
                .WithOne(a => a.PaymentRequest)
                .HasForeignKey<DetailRequestEntity>(a => a.PaymentRequestId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DetailRequestEntity>()
                .HasOne(u => u.DetailTable)
                .WithOne(a => a.DetailRequest)
                .HasForeignKey<DetailTableEntity>(a => a.DetailRequestId)
                .OnDelete(DeleteBehavior.Restrict);

            //Thiết lập mối quan hệ 1-n
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
                    j => j.HasOne<DetailRequestEntity>().WithMany().HasForeignKey("DetailRequestId").OnDelete(DeleteBehavior.Cascade)
                );

            modelBuilder.Entity<DetailTableEntity>()
                .HasMany(u => u.Departments)
                .WithMany(r => r.DetailTables)
                .UsingEntity<Dictionary<string, object>>(
                    "DetailTableDepartment",
                    j => j.HasOne<DepartmentEntity>().WithMany().HasForeignKey("DepartmentId").OnDelete(DeleteBehavior.Cascade),
                    j => j.HasOne<DetailTableEntity>().WithMany().HasForeignKey("DetailTableId").OnDelete(DeleteBehavior.Cascade)
                );
        }
    }
}
