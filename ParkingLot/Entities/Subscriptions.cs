namespace ParkingLot.Entities
{
	public class Subscriptions
	{
		public int Id { get; set; }
		public int Code { get; set; }
		public int SubscriberId { get; set; }
		public Subscriber Subscriber { get; set; } 
		public int Price { get; set; }
		public decimal DiscountValue { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public bool isDeleted { get; set; } = false;
	}

}
