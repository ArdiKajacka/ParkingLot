using ParkingLot.Entities;

namespace ParkingLot.DataStore
{
	public class PricingPlansData
	{
		public List<PricingPlans> AllPricingPlans { get; set; }
		public static PricingPlansData Current { get; } = new PricingPlansData();

		public PricingPlansData()
		{
			AllPricingPlans = new List<PricingPlans>()
			{
				new PricingPlans()
				{
					Id = 1,
					HourlyPricing = 2,
					DailyPricing = 3,
					MinimumHours = 1,
					Type = PricingPlanType.Weekday
				},
				new PricingPlans()
				{
					Id = 2,
					HourlyPricing = 4,
					DailyPricing = 10,
					MinimumHours = 3,
					Type = PricingPlanType.Weekend
				},
				

			};
		}
	}
}
			