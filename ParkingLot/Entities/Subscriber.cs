using ParkingLot.DbContexts;
using System.ComponentModel.DataAnnotations;

namespace ParkingLot.Entities
{
	public class Subscriber
	{

		[Required]
		public string? FirstName { get; set; } 
		[Required]
		public string LastName { get; set; }
		
		[Required]
		[Key]
		public int IdCard { get; set; }
		[Required]
		public string Email { get; set; } 
		[Required]
		public int Phone { get; set; }
		[Required]
		public int PlateNumber { get; set; }
		[Required]
		public bool IsDeleted { get; set; } = false;

	}
}
