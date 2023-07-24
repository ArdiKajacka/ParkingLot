// Function to reserve a parking spot and change its color to red, or free it up if already reserved
function toggleSpotReservation(parkingSpot) {
    if (parkingSpot.classList.contains('reserved')) {
        parkingSpot.style.backgroundColor = '#c7c7c7'; /* Light gray */
        parkingSpot.classList.remove('reserved');
        parkingSpot.innerText = 'P'; /* Display 'P' inside the spot when not reserved */
        parkingSpot.style.color = '#fff'; /* White font color for 'P' */
    } else {
        parkingSpot.style.backgroundColor = '#f33'; /* Red */
        parkingSpot.classList.add('reserved');
        const now = new Date();
        const formattedTime = formatDate(now);
        parkingSpot.innerText = `RESERVED: ${formattedTime}`;
        parkingSpot.style.color = '#000'; /* Black font color for the reservation text */
    }
}

// Function to format time as 'HH:MM AM/PM'
function formatDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Function to handle the click event on a parking spot
function onSpotClick(event) {
    const parkingSpot = event.target;
    toggleSpotReservation(parkingSpot);
}

// Function to generate the parking grid dynamically
function createParkingGrid(rows, columns) {
    const parkingGrid = document.getElementById('parkingGrid');
    parkingGrid.style.gridTemplateColumns = `repeat(${columns}, 100px)`; // Set the number of columns

    for (let i = 0; i < rows * columns; i++) {
        const parkingSpot = document.createElement('div');
        parkingSpot.classList.add('parking-spot');
        parkingSpot.addEventListener('click', onSpotClick);
        parkingSpot.innerText = 'P'; /* Display 'P' inside the spot when not reserved */
        parkingSpot.style.color = '#fff'; /* White font color for 'P' */
        parkingGrid.appendChild(parkingSpot);
    }
}

// Call the function to create the parking grid with 10 rows and 10 columns
createParkingGrid(10, 10);
