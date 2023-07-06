using Microsoft.AspNetCore.Mvc;
using ParkingLot.DataStore;

namespace ParkingLot.Controllers
{
	[ApiController]
	[Route("api/PricingPlans")]
	public class PricingPlansController :ControllerBase
	{
		[HttpGet]
		public JsonResult GetPricingDetails()
		{
			return new JsonResult(PricingPlansData.Current.AllPricingPlans);
		}
	}
}
