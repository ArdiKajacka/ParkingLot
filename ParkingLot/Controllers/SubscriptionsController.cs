﻿// SubscriptionsController.cs
using Microsoft.AspNetCore.Mvc;
using ParkingLot.Entities;
using ParkingLot.Repositories;
using System;

[ApiController]
[Route("api/subscriptions")]
public class SubscriptionsController : ControllerBase
{
    private readonly SubscriptionsRepository _subscriptionsRepository;

    public SubscriptionsController(SubscriptionsRepository subscriptionsRepository)
    {
        _subscriptionsRepository = subscriptionsRepository;
    }

    // POST api/subscriptions
    [HttpPost]
    public IActionResult CreateSubscription(Subscriptions subscription)
    {
        try
        {
            _subscriptionsRepository.Create(subscription);
            return Ok("Subscription created successfully.");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to create subscription: {ex.Message}");
        }
    }

    // GET api/subscriptions/code/{code}
    [HttpGet("code/{code}")]
    public IActionResult GetSubscriptionByCode(int code)
    {
        try
        {
            var subscription = _subscriptionsRepository.GetSubscriptionByCode(code);
            if (subscription == null)
            {
                return NotFound("Subscription not found.");
            }

            return Ok(subscription);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to retrieve subscription: {ex.Message}");
        }
    }

    // GET api/subscriptions/search/{subscriberName}
    [HttpGet("search/{subscriberName}")]
    public IActionResult GetSubscriptionsBySubscriberName(string subscriberName)
    {
        try
        {
            var subscriptions = _subscriptionsRepository.GetSubscriptionsBySubscriberName(subscriberName);
            return Ok(subscriptions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to retrieve subscriptions: {ex.Message}");
        }
    }
}