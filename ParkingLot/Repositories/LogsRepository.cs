using ParkingLot.DataStore;

namespace ParkingLot.Repositories
{
	public class LogsRepository
	{
		private readonly LogsData _logsData;
		


		public LogsRepository()
		{
			
			_logsData = LogsData.Current;
		}
	}
}
