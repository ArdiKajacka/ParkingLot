namespace ParkingLot.Entities
{
	public class Logs
	{
		public int Id { get; set; }
		public int Code { get; set; }  
		public int SubscriptionId { get; set; }
		public Subscriptions Subscription { get; set; }

		public DateTime CheckIn { get; set; }
		public DateTime CheckOut { get; set; }
		public int Price { get; set; } 
	}
}
