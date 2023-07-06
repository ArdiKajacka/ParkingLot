// SubscriberRepository.cs

using System.Linq;
using ParkingLot.DbContexts;
using ParkingLot.Entities;
using ParkingLot.DataStore;

namespace ParkingLot.Repositories
{
	public class SubscriberRepository
	{
		private readonly ParkingContext _context;

		public SubscriberRepository(ParkingContext context)
		{
			_context = context;
		}

		public int GetActiveSubscriberCount()
		{
			return _context.Subscriber.Count(subscriber => !subscriber.IsDeleted);
		}
	}
}
