using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingLot.Entities
{
	public class Logs
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int Code { get; set; }  
		public int SubscriptionId { get; set; }
		public Subscriptions Subscription { get; set; }

		public DateTime CheckIn { get; set; }
		public DateTime CheckOut { get; set; }
		public decimal Price { get; set; } 

		public bool IsDeleted { get; set; }
	}
}
