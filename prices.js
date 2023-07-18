<<<<<<< HEAD
let weekDayHourly;
let weekDayDaily;
let weekDayMinimumHours;
let weekEndHourly;
let weekEndDaily;
let weekEndMinimumHours;

function fetchPricingData() {
  return new Promise((resolve, reject) => {
    fetch('pricing.json')
      .then(response => response.json())
      .then(jsonData => {
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
      })
      .catch(error => {
        console.error('Error fetching or parsing the JSON:', error);
        reject(error);
      });
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
=======
let weekDayHourly;
let weekDayDaily;
let weekDayMinimumHours;
let weekEndHourly;
let weekEndDaily;
let weekEndMinimumHours;

function fetchPricingData() {
  return new Promise((resolve, reject) => {
    fetch('pricing.json')
      .then(response => response.json())
      .then(jsonData => {
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
      })
      .catch(error => {
        console.error('Error fetching or parsing the JSON:', error);
        reject(error);
      });
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
>>>>>>> 39a9c76825486bd92e650e6837992fb399b01e64
