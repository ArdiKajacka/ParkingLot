let weekDayHourly;
let weekDayDaily;
let weekDayMinimumHours;
let weekEndHourly;
let weekEndDaily;
let weekEndMinimumHours;

function fetchPricingData() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'pricing.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const jsonData = JSON.parse(xhr.responseText);
          const weekDayPricing = jsonData.pricing[0];
          const weekEndPricing = jsonData.pricing[1];

          weekDayHourly = weekDayPricing.hourlyPricing;
          weekDayDaily = weekDayPricing.dailyPricing;
          weekDayMinimumHours = weekDayPricing.minimumHours;

          weekEndHourly = weekEndPricing.hourlyPricing;
          weekEndDaily = weekEndPricing.dailyPricing;
          weekEndMinimumHours = weekEndPricing.minimumHours;

          console.log("Pricing Data fetched.");
          resolve();
        } else {
          console.error('Error fetching the JSON:', xhr.status);
          reject(xhr.status);
        }
      }
    };
    xhr.send();
  });
}

function updatePrices() {
  const weekDayHourlyFunction = document.getElementById("weekDayHourly");
  const weekDayDailyFunction = document.getElementById("weekDayDaily");
  const weekDayMinHoursFunction = document.getElementById("weekDayMinHours");

  weekDayHourlyFunction.textContent = weekDayHourly + "€";
  weekDayDailyFunction.textContent = weekDayDaily + "€";
  weekDayMinHoursFunction.textContent = "Minimum: " + weekDayMinimumHours + " hours";


  const weekEndHourlyFunction = document.getElementById("weekEndHourly");
  const weekEndDailyFunction = document.getElementById("weekEndDaily");
  const weekEndMinHoursFunction = document.getElementById("weekEndMinHours");

  weekEndHourlyFunction.textContent = weekEndHourly + "€";
  weekEndDailyFunction.textContent = weekEndDaily + "€";
  weekEndMinHoursFunction.textContent = "Minimum: " + weekEndMinimumHours + " hours";
}

fetchPricingData()
  .then(() => {
    updatePrices();
  });
