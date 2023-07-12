using ParkingLot.DataStore;
using ParkingLot.DbContexts;
using ParkingLot.Entities;

namespace ParkingLot.Repositories
{
	public class LogsRepository
	{

		private readonly ParkingContext _context;

		public LogsRepository(ParkingContext context)
		{
			_context = context;
		}

		public void CreateLogs(Logs logs)
		{
			PricingPlans pricingPlan = PricingPlansData.Current.AllPricingPlans.FirstOrDefault(plan => plan.Type == GetPricingPlanType(logs.CheckIn));

			// Kontrollon nese subscription Id eshte prezente
			if (logs.SubscriptionId > 0)
			{
				logs.Price = 0; 
			}
			else
			{//mat kohen qe makina ka qendruar ne parkim
				TimeSpan duration = logs.CheckOut - logs.CheckIn;
				decimal totalHours = (decimal)duration.TotalHours;

				//nese nuk e ka kaluar minimumin per te paguar sa per 1 dite 
				if (totalHours <= pricingPlan.MinimumHours)
				{
					logs.Price = totalHours * pricingPlan.HourlyPricing;
				}
				else
				{//gjen sa dite ka qendruar dhe sa ore pervec diteve
					int totalDays = (int)Math.Floor(totalHours / 24);
					decimal remainingHours = totalHours % 24;
					//kontrollon nese remaining hours qe ngelen nuk e ka kaluar minimum hours  dhe e shton ne cmim per ore
					if (remainingHours <= pricingPlan.MinimumHours)
					{
						logs.Price = (totalDays * pricingPlan.DailyPricing) + (remainingHours * pricingPlan.HourlyPricing);
					}
					else
					//nese remaining hours e ka kaluar minimum hours e shton si dite
					{
						logs.Price = ((totalDays + 1) * pricingPlan.DailyPricing);
					}
				}
			}

			_context.Logs.Add(logs);
			_context.SaveChanges();
		}

		private PricingPlanType GetPricingPlanType(DateTime date)
		{
			return date.DayOfWeek switch
			{
				DayOfWeek.Saturday or DayOfWeek.Sunday => PricingPlanType.Weekend,
				_ => PricingPlanType.Weekday,
			};
		}



		public IEnumerable<Logs> GetLogsByDate(DateTime date)
		{
			return _context.Logs.Where(logs => logs.CheckIn.Date == date.Date);
		}

		public IEnumerable<Logs> SearchLogs(string searchQuery)
		{
			return _context.Logs
				.Where(logs => logs.Code.ToString() == searchQuery ||
							   logs.Subscription.Subscriber.FirstName.Contains(searchQuery) ||
							   logs.Subscription.Subscriber.LastName.Contains(searchQuery))
				.Select(logs => new Logs
				{
					Id = logs.Id,
					Code = logs.Code,
					SubscriptionId = logs.SubscriptionId,
					Subscription = new Subscriptions
					{
						Id = logs.Subscription.Id,
						Subscriber = new Subscriber
						{
							FirstName = logs.Subscription.Subscriber.FirstName,
							LastName = logs.Subscription.Subscriber.LastName,
							Email = logs.Subscription.Subscriber.Email
						}
					},
					CheckIn = logs.CheckIn,
					CheckOut = logs.CheckOut,
					Price = logs.Price
				});
		}


		public void DeleteLogs(int logsId)
		{
			var logs = _context.Logs.Find(logsId);
			if (logs != null)
			{
				logs.IsDeleted = true;
				_context.SaveChanges();
			}
		}

	}
}
