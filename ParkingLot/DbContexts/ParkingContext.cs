using ParkingLot.Entities;
using Microsoft.EntityFrameworkCore;
using ParkingLot.Entities;

namespace ParkingLot.DbContexts
{
	public class ParkingContext : DbContext
	{
		public ParkingContext(DbContextOptions<ParkingContext> options) : base(options) { }

		

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			
		}

		public DbSet<ParkingSpots> ParkingSpots { get; set; }
		public DbSet<PricingPlans> PricingPlans { get; set; }
		public DbSet<Subscriber> Subscriber { get; set; }
		public DbSet<Subscriptions> Subscriptions { get; set; }
		public DbSet<Logs> Logs { get; set; }
	}
}
