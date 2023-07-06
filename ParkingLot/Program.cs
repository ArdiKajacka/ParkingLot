using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ParkingLot.DbContexts;
using Microsoft.EntityFrameworkCore;
using ParkingLot.Repositories;

namespace ParkingLot
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Get the configuration from the appsettings.json file
			var configuration = new ConfigurationBuilder()
				.SetBasePath(builder.Environment.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.Build();

			builder.Services.AddControllers();

			// Configure the DbContext with the connection string
			builder.Services.AddDbContext<ParkingContext>(options =>
				options.UseNpgsql(configuration.GetConnectionString("ParkingDbConnection")));

			// Add the ParkingSpotRepository to the services
			builder.Services.AddScoped<ParkingSpotRepository>();

			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			app.UseAuthorization();

			app.MapControllers();

			app.Run();
		}
	}
}
