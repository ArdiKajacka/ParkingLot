// SubscriptionsRepository.cs
using System;
using System.Collections.Generic;
using System.Linq;
using ParkingLot.DataStore;
using ParkingLot.Entities;

namespace ParkingLot.Repositories
{
	public class SubscriptionsRepository
	{
		public void Create(Subscriptions newSubscription)
		{
			// kontrollon nese cdo filed eshte i plotesuar
			if (newSubscription == null ||
				newSubscription.Code == 0 ||
				newSubscription.StartTime == DateTime.MinValue ||
				newSubscription.EndTime == DateTime.MinValue)
			{
				throw new ArgumentException("All fields are required.");
			}

			// kontrollon nese nje subscription me te njetin kod ekziston
			if (SubscriptionData.Current.AllSubscriptions.Any(sub => sub.Code == newSubscription.Code))
			{
				throw new ArgumentException("A subscription with the same code already exists.");
			}

			// validim mbi daten,data e mbarimit duhet te jete pas dates se fillimit gjithmone
			if (newSubscription.StartTime >= newSubscription.EndTime)
			{
				throw new ArgumentException("End time must be after start time.");
			}

			SubscriptionData.Current.AllSubscriptions.Add(newSubscription);
		}

		public Subscriptions GetSubscriptionByCode(int code)
		{
			return SubscriptionData.Current.AllSubscriptions.FirstOrDefault(sub => sub.Code == code);
		}


		//metode per te gjetur subscription nga emri i subscriberit
		public IEnumerable<Subscriptions> GetSubscriptionsBySubscriberName(string subscriberName)
		{
			return SubscriptionData.Current.AllSubscriptions
				.Where(sub => sub.Subscriber != null &&
							   (sub.Subscriber.FirstName.Contains(subscriberName, StringComparison.OrdinalIgnoreCase) ||
								sub.Subscriber.LastName.Contains(subscriberName, StringComparison.OrdinalIgnoreCase)))
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
					Subscriber = SubscriberData.Current.AllSubscribers.FirstOrDefault(s => s.IdCard == sub.SubscriberId)
				});
		}


	}
}
