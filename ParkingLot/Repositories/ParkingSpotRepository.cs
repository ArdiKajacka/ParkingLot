using ParkingLot.DataStore;
using ParkingLot.Entities;
using System.Linq;

namespace ParkingLot.Repositories
{
	public class ParkingSpotRepository
	{
		private readonly ParkingSpotsData _parkingSpotsData;
		private readonly SubscriberData _subscriberData;


		public ParkingSpotRepository()
		{
			_subscriberData = SubscriberData.Current;
			_parkingSpotsData = ParkingSpotsData.Current;
		}
		public void UpdateParkingSpot(ParkingSpots updatedParkingSpot)
		{
			var existingParkingSpot = _parkingSpotsData.AllParkingSpots.FirstOrDefault(p => p.Id == updatedParkingSpot.Id);
			if (existingParkingSpot != null)
			{
				existingParkingSpot.TotalSpots = updatedParkingSpot.TotalSpots;
			}
			
				
		}


		public int GetReservedSpots()
		{
			var activeSubscriberCount = _subscriberData.AllSubscribers.Count(subscriber => !subscriber.IsDeleted);
			return activeSubscriberCount;
		}

		public int GetTotalSpots()
		{
			var totalSpots = ParkingSpotsData.Current.AllParkingSpots.Sum(p => p.TotalSpots);
			return totalSpots;
		}

		public int GetFreeSpots()
		{
			int totalSpots = GetTotalSpots();
			int reservedSpots = GetReservedSpots();
			int freeSpots = totalSpots - reservedSpots;
			return freeSpots;
		}


	}
}
