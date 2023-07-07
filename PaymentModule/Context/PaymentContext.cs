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
        public virtual DbSet<UserEntity> Users { get; set; }
        public virtual DbSet<AccountEntity> Accounts { get; set; }
        public virtual DbSet<RoleEntity> Roles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Thiết lập mối quan hệ 1-1
            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.MyAccount)
                .WithOne(a => a.MyUser)
                .HasForeignKey<AccountEntity>(a => a.UserId);

            //Thiết lập mối quan hệ 1-n
            /*modelBuilder.Entity<UserEntity>()
               .HasMany(u => u.Roles)
               .WithOne()
               .HasForeignKey(r => r.UserId);*/

            //Thiết lập mối quan hệ n-n
            modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity<Dictionary<string, object>>(
                "UserRoles",
                j => j.HasOne<RoleEntity>().WithMany().HasForeignKey("RoleId"),
                j => j.HasOne<UserEntity>().WithMany().HasForeignKey("UserId")
            );
        }

    }
}
