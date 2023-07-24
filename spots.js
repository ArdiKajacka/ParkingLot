var overallSpots;
var occupiedSpots;
var reservedSpots;
var freeSpots;
var busySpots;

function fetchOverallSpots() {
  return new Promise((resolve, reject) => {
    debugger
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7145/api/subscribers', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const jsonData = JSON.parse(xhr.responseText);
          const tempOverallSpots = jsonData.spots[0].value;
          resolve(tempOverallSpots);
        } else {
          console.error('Error fetching the JSON:', xhr.status);
          reject(xhr.status);
        }
      }
    };
    xhr.send();
  });
}


fetchOverallSpots()
  .then(tempOverallSpots => {
    console.log("kot");
    overallSpots = tempOverallSpots;

    // Fetch the occupied spots
    fetch('occupiedRegular.json')
      .then(response => response.json())
      .then(jsonData => {
        const tempOccupiedSpots = jsonData.occupiedRegular[0].value;
        occupiedSpots = tempOccupiedSpots;

        // Fetch the reserved spots
        fetch('subscriber.json')
          .then(response => response.json())
          .then(jsonData => {
            const tempReservedSpots = jsonData.subscriber.length;
            reservedSpots = tempReservedSpots;

            // Calculate the free spots
            freeSpots = parseInt(overallSpots - (occupiedSpots + reservedSpots));
            busySpots = parseInt(occupiedSpots + reservedSpots)


            // Call the function to process occupied spots
            processOccupiedSpots(occupiedSpots);

            // Update the h2 element with the number of parking spots left
            updateSpotsLeft(freeSpots);
            updateBusySpots(busySpots);
          })
          .catch(error => {
            console.error('Error fetching or parsing the JSON:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching or parsing the JSON:', error);
      });
  })
  .catch(error => {
    // Handle error if needed
  });

// Function to process occupied spots
function processOccupiedSpots(occupiedSpots) {
  // Add your code to process the occupied spots here
  console.log("Processing occupied spots: " + occupiedSpots);
}

// Function to update the h2 element with the number of spots left
function updateSpotsLeft(freeSpots) {
    const h2Element = document.getElementById('freeSpots-header');
    const freeProgressBar = document.getElementById("firstProgress");
    const widthPercentage = `${freeSpots}%`;
    freeProgressBar.textContent = freeSpots;
    freeProgressBar.style.width = widthPercentage;
    if (freeSpots <= 10) {
        freeProgressBar.style.backgroundColor = 'red'; // Set background color to red when freeSpots is 10 or less
      } else if (freeSpots <= 25) {
        freeProgressBar.style.backgroundColor = 'yellow'; // Set background color to yellow when freeSpots is between 11 and 25
      } else {
        freeProgressBar.style.backgroundColor = 'green'; // Set background color to green when freeSpots is greater than 25
      }
    
    h2Element.textContent = `Parking spots left: ${freeSpots}`;
}

function updateBusySpots(busySpots) {
    const busyProgressBar = document.getElementById("secondProgress");
    const widthPercentage = `${busySpots}%`;
    busyProgressBar.textContent = busySpots;
    busyProgressBar.style.width = widthPercentage;
}
