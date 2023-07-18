using Microsoft.AspNetCore.Mvc;
using ParkingLot.Entities;
using ParkingLot.Repositories;
using System;
using System.Collections.Generic;

namespace ParkingLot.Controllers
{
	[ApiController]
	[Route("api/Logs")]
	public class LogsController : ControllerBase
	{
		private readonly LogsRepository _logsRepository;

		public LogsController(LogsRepository logsRepository)
		{
			_logsRepository = logsRepository;
		}

		// POST api/Logs
		[HttpPost]
		public IActionResult CreateLogs([FromBody] Logs logs)
		{
			try
			{
				_logsRepository.CreateLogs(logs);
				return Ok("Log created successfully.");
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to create log: {ex.Message}");
			}
		}


		// GET api/Logs/Date/{date}
		[HttpGet("Date/{date}")]
		public IActionResult GetLogsByDate(DateTime date)
		{
			try
			{
				IEnumerable<Logs> logs = _logsRepository.GetLogsByDate(date);
				return Ok(logs);
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to retrieve logs: {ex.Message}");
			}
		}

		// GET api/Logs/FirstName/LastName/Code
		[HttpGet("SubFname,Lname,Code/{searchQuery}")]
		public IActionResult SearchLogs(string searchQuery)
		{
			try
			{
				IEnumerable<Logs> logs = _logsRepository.SearchLogs(searchQuery);
				return Ok(logs);
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to search logs: {ex.Message}");
			}
		}

		// DELETE api/Logs/{logsId}
		[HttpDelete("{logsId}")]
		public IActionResult DeleteLogs(int logsId)
		{
			try
			{
				_logsRepository.DeleteLogs(logsId);
				return Ok("Log deleted successfully.");
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to delete log: {ex.Message}");
			}
		}

		[HttpPatch("{logsId}/checkout time")]
		public IActionResult UpdateCheckoutTime(int logsId, [FromBody] DateTime newCheckOutTime)
		{
			_logsRepository.UpdateCheckoutTime(logsId, newCheckOutTime);
			return Ok();
		}
	}
}
