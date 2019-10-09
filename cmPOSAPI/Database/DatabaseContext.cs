using System;
using cmPOSAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cmPOSAPI.Database
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Transactions> Transactions { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Created).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Transactions>(entity =>
            {
                entity.HasKey(e => e.TransactionId);

                entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

                entity.Property(e => e.BuyerId).HasColumnName("buyer_id");

                entity.Property(e => e.EmployeeId)
                    .IsRequired()
                    .HasColumnName("employee_id");

                entity.Property(e => e.OrderList)
                    .IsRequired()
                    .HasColumnName("order_list");

                entity.Property(e => e.PaymentDetail).HasColumnName("payment_detail");

                entity.Property(e => e.PaymentType).HasColumnName("payment_type");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.ShippingCost).HasColumnName("shipping_cost");

                entity.Property(e => e.TaxPercent).HasColumnName("tax_percent");

                entity.Property(e => e.Timestamp).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasIndex(e => e.Username)
                    .HasName("AK_Users_Username")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Position).HasDefaultValueSql("(N'Cashier')");

                entity.Property(e => e.Username).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
