﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PaymentModule.Context;

#nullable disable

namespace PaymentModule.Migrations
{
    [DbContext(typeof(PaymentContext))]
    partial class PaymentContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.19")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ApproverDetailRequest", b =>
                {
                    b.Property<Guid>("DetailRequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ApproverId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Queue")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("varchar(255)");

                    b.HasKey("DetailRequestId", "ApproverId", "Queue", "Status");

                    b.HasIndex("ApproverId");

                    b.ToTable("ApproverDetailRequest");
                });

            modelBuilder.Entity("PaymentModule.Entities.AccountEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("PaymentModule.Entities.AdditionalEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AcademicLevel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankAccountName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankAccountNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankBranchName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BranchNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BuildingOrFlatNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BusinessPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfIDCard")
                        .HasColumnType("datetime2");

                    b.Property<string>("HealthInsurance")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HomePhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IDCardNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LeavingDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PersonalEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfIDCard")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProvinceOrState")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpecializedQualification")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDateMaternityLeave")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartingDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartingDateOfficial")
                        .HasColumnType("datetime2");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Additionals");
                });

            modelBuilder.Entity("PaymentModule.Entities.AttachmentEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DetailRequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DetailRequestId");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("PaymentModule.Entities.BankEntity", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AccountNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Beneficiary")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("DetailRequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("SupplierID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DetailRequestId")
                        .IsUnique()
                        .HasFilter("[DetailRequestId] IS NOT NULL");

                    b.HasIndex("SupplierID");

                    b.ToTable("Banks");
                });

            modelBuilder.Entity("PaymentModule.Entities.ContractEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AddtionalId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ContractType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FromDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SigningDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ToDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AddtionalId");

                    b.ToTable("Contracts");
                });

            modelBuilder.Entity("PaymentModule.Entities.CurrencyEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ExchangeRate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("PaymentModule.Entities.DepartmentEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("PaymentModule.Entities.DetailRequestEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CurrencyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DepartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("PONumber")
                        .HasColumnType("int");

                    b.Property<string>("PaymentFor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PaymentMethodId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Purpose")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("SupplierId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("PaymentMethodId");

                    b.HasIndex("SupplierId");

                    b.ToTable("DetailRequests");
                });

            modelBuilder.Entity("PaymentModule.Entities.DetailTableEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<Guid>("DepartmentTableId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DetailRequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Industry")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("InvDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("InvNo")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentTableId");

                    b.HasIndex("DetailRequestId");

                    b.ToTable("DetailTables");
                });

            modelBuilder.Entity("PaymentModule.Entities.FamilyEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BuildingOrFlatNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MartialStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProvinceOrState")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Relationship")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Families");
                });

            modelBuilder.Entity("PaymentModule.Entities.OverviewEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BelongToDepartments")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("BirthDay")
                        .HasColumnType("datetime2");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CostCenter")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmployeeNumber")
                        .HasColumnType("int");

                    b.Property<string>("EmployeeType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FunctionEmployee")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Groups")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LineManager")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OfficeLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rank")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rights")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SectionsTeams")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sex")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Overviews");
                });

            modelBuilder.Entity("PaymentModule.Entities.PaymentMethodEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PaymentMethods");
                });

            modelBuilder.Entity("PaymentModule.Entities.PaymentRequestEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("DetailRequestId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Purpose")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RequestCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("StatusId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DetailRequestId")
                        .IsUnique();

                    b.HasIndex("StatusId");

                    b.HasIndex("UserId");

                    b.ToTable("PaymentRequests");
                });

            modelBuilder.Entity("PaymentModule.Entities.RelationshipEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("BirthDay")
                        .HasColumnType("datetime2");

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FamilyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Relationship")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FamilyId");

                    b.ToTable("Relationships");
                });

            modelBuilder.Entity("PaymentModule.Entities.RoleEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("PaymentModule.Entities.SignatureEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QRcode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("dateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Signatures");
                });

            modelBuilder.Entity("PaymentModule.Entities.StatusEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("PaymentModule.Entities.SupplierEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("PaymentModule.Entities.TotalPaymentEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("AdvanceAmount")
                        .HasColumnType("float");

                    b.Property<Guid>("DetailRequestID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("SuggestedAmount")
                        .HasColumnType("float");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.Property<double>("TotalPayment")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("DetailRequestID")
                        .IsUnique();

                    b.ToTable("TotalPayments");
                });

            modelBuilder.Entity("PaymentModule.Entities.UserEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Avatar")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("UserRole", b =>
                {
                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("RoleId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("ApproverDetailRequest", b =>
                {
                    b.HasOne("PaymentModule.Entities.UserEntity", null)
                        .WithMany()
                        .HasForeignKey("ApproverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.DetailRequestEntity", null)
                        .WithMany()
                        .HasForeignKey("DetailRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.AccountEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.UserEntity", "MyUser")
                        .WithOne("MyAccount")
                        .HasForeignKey("PaymentModule.Entities.AccountEntity", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MyUser");
                });

            modelBuilder.Entity("PaymentModule.Entities.AdditionalEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.UserEntity", "User")
                        .WithOne("Additional")
                        .HasForeignKey("PaymentModule.Entities.AdditionalEntity", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PaymentModule.Entities.AttachmentEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.DetailRequestEntity", null)
                        .WithMany("Attachments")
                        .HasForeignKey("DetailRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.BankEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.DetailRequestEntity", "DetailRequest")
                        .WithOne("Bank")
                        .HasForeignKey("PaymentModule.Entities.BankEntity", "DetailRequestId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("PaymentModule.Entities.SupplierEntity", null)
                        .WithMany("Banks")
                        .HasForeignKey("SupplierID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("DetailRequest");
                });

            modelBuilder.Entity("PaymentModule.Entities.ContractEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.AdditionalEntity", null)
                        .WithMany("contracts")
                        .HasForeignKey("AddtionalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.DetailRequestEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.CurrencyEntity", null)
                        .WithMany("DetailRequests")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.DepartmentEntity", null)
                        .WithMany("DetailRequests")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.PaymentMethodEntity", null)
                        .WithMany("DetailRequests")
                        .HasForeignKey("PaymentMethodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.SupplierEntity", null)
                        .WithMany("DetailRequests")
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.DetailTableEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.DepartmentEntity", null)
                        .WithMany("DetailTables")
                        .HasForeignKey("DepartmentTableId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.DetailRequestEntity", null)
                        .WithMany("DetailRequestTables")
                        .HasForeignKey("DetailRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.FamilyEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.UserEntity", "User")
                        .WithOne("Family")
                        .HasForeignKey("PaymentModule.Entities.FamilyEntity", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PaymentModule.Entities.OverviewEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.UserEntity", "User")
                        .WithOne("Overview")
                        .HasForeignKey("PaymentModule.Entities.OverviewEntity", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PaymentModule.Entities.PaymentRequestEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.DetailRequestEntity", "DetailRequest")
                        .WithOne("PaymentRequest")
                        .HasForeignKey("PaymentModule.Entities.PaymentRequestEntity", "DetailRequestId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.StatusEntity", null)
                        .WithMany("PaymentRequests")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.UserEntity", null)
                        .WithMany("PaymentRequests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("DetailRequest");
                });

            modelBuilder.Entity("PaymentModule.Entities.RelationshipEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.FamilyEntity", null)
                        .WithMany("relationships")
                        .HasForeignKey("FamilyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.SignatureEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.UserEntity", "User")
                        .WithOne("Signature")
                        .HasForeignKey("PaymentModule.Entities.SignatureEntity", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PaymentModule.Entities.TotalPaymentEntity", b =>
                {
                    b.HasOne("PaymentModule.Entities.DetailRequestEntity", "DetailRequest")
                        .WithOne("TotalPayment")
                        .HasForeignKey("PaymentModule.Entities.TotalPaymentEntity", "DetailRequestID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("DetailRequest");
                });

            modelBuilder.Entity("UserRole", b =>
                {
                    b.HasOne("PaymentModule.Entities.RoleEntity", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PaymentModule.Entities.UserEntity", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.AdditionalEntity", b =>
                {
                    b.Navigation("contracts");
                });

            modelBuilder.Entity("PaymentModule.Entities.CurrencyEntity", b =>
                {
                    b.Navigation("DetailRequests");
                });

            modelBuilder.Entity("PaymentModule.Entities.DepartmentEntity", b =>
                {
                    b.Navigation("DetailRequests");

                    b.Navigation("DetailTables");
                });

            modelBuilder.Entity("PaymentModule.Entities.DetailRequestEntity", b =>
                {
                    b.Navigation("Attachments");

                    b.Navigation("Bank")
                        .IsRequired();

                    b.Navigation("DetailRequestTables");

                    b.Navigation("PaymentRequest")
                        .IsRequired();

                    b.Navigation("TotalPayment")
                        .IsRequired();
                });

            modelBuilder.Entity("PaymentModule.Entities.FamilyEntity", b =>
                {
                    b.Navigation("relationships");
                });

            modelBuilder.Entity("PaymentModule.Entities.PaymentMethodEntity", b =>
                {
                    b.Navigation("DetailRequests");
                });

            modelBuilder.Entity("PaymentModule.Entities.StatusEntity", b =>
                {
                    b.Navigation("PaymentRequests");
                });

            modelBuilder.Entity("PaymentModule.Entities.SupplierEntity", b =>
                {
                    b.Navigation("Banks");

                    b.Navigation("DetailRequests");
                });

            modelBuilder.Entity("PaymentModule.Entities.UserEntity", b =>
                {
                    b.Navigation("Additional")
                        .IsRequired();

                    b.Navigation("Family")
                        .IsRequired();

                    b.Navigation("MyAccount")
                        .IsRequired();

                    b.Navigation("Overview")
                        .IsRequired();

                    b.Navigation("PaymentRequests");

                    b.Navigation("Signature")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
