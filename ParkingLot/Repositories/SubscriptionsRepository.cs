using System;
using System.Collections.Generic;
using System.Linq;
using ParkingLot.DataStore;
using ParkingLot.DbContexts;
using ParkingLot.Entities;

namespace ParkingLot.Repositories
{
	public class SubscriptionsRepository
	{
		private readonly ParkingContext _context;

		public SubscriptionsRepository(ParkingContext context)
		{
			_context = context;
		}

		private PricingPlans GetPricingPlan(DayOfWeek dayOfWeek)
		{
			return PricingPlansData.Current.AllPricingPlans.FirstOrDefault(plan =>
				plan.Type == PricingPlanType.Weekday && dayOfWeek >= DayOfWeek.Monday && dayOfWeek <= DayOfWeek.Friday)
				   ?? PricingPlansData.Current.AllPricingPlans.FirstOrDefault(plan =>
				plan.Type == PricingPlanType.Weekend && (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday));
		}

		public void Create(Subscriptions newSubscription)
		{
			// Check if all fields are provided
			if (newSubscription == null ||
				newSubscription.StartTime == DateTime.MinValue ||
				newSubscription.EndTime == DateTime.MinValue)
			{
				throw new ArgumentException("All fields are required.");
			}

			// Check if a subscription with the same code already exists
			if (newSubscription.Code != 0 && _context.Subscriptions.Any(sub => sub.Code == newSubscription.Code))
			{
				throw new ArgumentException("A subscription with the same code already exists.");
			}

			// Validate the start and end time
			if (newSubscription.StartTime >= newSubscription.EndTime)
			{
				throw new ArgumentException("End time must be after start time.");
			}

			// Calculate the price based on the number of days and pricing plan type
			decimal price = 0;
			TimeSpan subscriptionDuration = newSubscription.EndTime - newSubscription.StartTime;
			int totalDays = (int)Math.Ceiling(subscriptionDuration.TotalDays);
			PricingPlans pricingPlan = GetPricingPlan(newSubscription.StartTime.DayOfWeek);

			if (pricingPlan != null)
			{
				price = totalDays * pricingPlan.DailyPricing;

				// Apply discount if available
				if (newSubscription.DiscountValue > 0)
				{
					price -= newSubscription.DiscountValue;
				}
			}

			// Set the calculated price to the subscription
			newSubscription.Price = price;

			// Add the subscription to the DbSet
			_context.Subscriptions.Add(newSubscription);

			// Save changes to the database
			_context.SaveChanges();
		}

		public Subscriptions GetSubscriptionByCode(int code)
		{
			return _context.Subscriptions.FirstOrDefault(sub => sub.Code == code);
		}

		public IEnumerable<Subscriptions> GetSubscriptionsBySubscriberName(string subscriberName)
		{
			return _context.Subscriptions
				.Where(sub => sub.Subscriber != null &&
							   (sub.Subscriber.FirstName == subscriberName ||
								sub.Subscriber.Email == subscriberName ||
								sub.Subscriber.LastName == subscriberName))
				.Select(sub => new Subscriptions
				{
					Id = sub.Id,
					Code = sub.Code,
					SubscriberId = sub.SubscriberId,
					Price = sub.Price,
					DiscountValue = sub.DiscountValue,
					StartTime = sub.StartTime,
					EndTime = sub.EndTime,
					isDeleted = sub.isDeleted,
					Subscriber = _context.Subscriber.FirstOrDefault(s => s.IdCard == sub.SubscriberId)
				});
		}

		public void Update(Subscriptions subscription)
		{
			if (subscription == null)
			{
				throw new ArgumentException("Subscription object cannot be null.");
			}

			var existingSubscription =
				_context.Subscriptions.FirstOrDefault(sub => sub.Code == subscription.Code);
			if (existingSubscription == null)
			{
				throw new ArgumentException("Subscription not found.");
			}

			// Update the new values
			existingSubscription.StartTime = subscription.StartTime;
			existingSubscription.EndTime = subscription.EndTime;
			existingSubscription.Price = subscription.Price;
			existingSubscription.DiscountValue = subscription.DiscountValue;

			_context.SaveChanges();
		}

		public void SoftDelete(int code)
		{
			var subscription =
				_context.Subscriptions.FirstOrDefault(sub => sub.Code == code);
			if (subscription == null)
			{
				throw new ArgumentException("Subscription not found.");
			}

			subscription.isDeleted = true;
			_context.SaveChanges();
		}
	}
}
