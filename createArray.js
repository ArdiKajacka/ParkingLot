var subscriberArray;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'subscriber.json', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    // Parse the JSON response
    var subscriberData = JSON.parse(xhr.responseText);

    subscriberArray = subscriberData.subscriber;

    // Call the function to render the initial table
    renderTable(subscriberArray);

    // Attach event listeners after the data is loaded
    attachEventListeners();
  }
};
xhr.send();

function attachEventListeners() {
  // Add event listener for keyword filter
  const keywordInput = document.getElementById('searchCars');
  keywordInput.addEventListener('input', function() {
    filterCarsByKeyword(subscriberArray);
  });
}

function renderTable(data) {
    // Get the container element where the table will be inserted
    const container = document.getElementById("table-container");
  
    // Clear the container
    container.innerHTML = "";
  
    // Create the table element
    const table = document.createElement("table");
  
    // Create the table header row
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
  
    // Get the keys (column names) of the first object in the data array
    const keys = Object.keys(data[0]);
  
    // Create the header cells
    keys.forEach((key, index) => {
      const th = document.createElement("th");
      th.textContent = key;
  
      // Create the order button
      const orderButton = document.createElement("button");
      orderButton.textContent = "⯆";
      orderButton.addEventListener("click", () => orderBy(index, key));
  
      // Append the order button to the header cell
      th.appendChild(orderButton);
  
      // Append the header cell to the header row
      headerRow.appendChild(th);
    });
  
    // Append the header row to the table header
    thead.appendChild(headerRow);
  
    // Create the table body
    const tbody = document.createElement("tbody");
  
    // Loop through the data array and create table rows
    data.forEach((item) => {
      const row = document.createElement("tr");
  
      // Loop through the keys and create table cells
      keys.forEach((key) => {
        const cell = document.createElement("td");
        cell.textContent = item[key];
        row.appendChild(cell);
      });
  
      // Append the row to the table body
      tbody.appendChild(row);
    });
  
    // Append the table header and body to the table
    table.appendChild(thead);
    table.appendChild(tbody);
  
    // Append the table to the container element
    container.appendChild(table);
  }
  

function filterCarsByKeyword(data) {
  const keywordInput = document.getElementById('searchCars');
  const keyword = keywordInput.value.toLowerCase().trim();

  if (keyword === "") {
    // If the keyword input is empty, render the original table
    renderTable(subscriberArray);
  } else {
    // Filter the subscriberArray based on the keyword
    const filteredSubscribers = data.filter(subscriber =>
      Object.values(subscriber).some(value =>
        value.toString().toLowerCase().includes(keyword)
      )
    );

    renderTable(filteredSubscribers);
  }
}

let arrayInUse = subscriberArray; // Define arrayInUse and initialize it with subscriberArray
let order = "asc";

function orderBy(columnIndex, key) {

  if (typeof arrayInUse !== 'undefined') {
    arrayInUse.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      }
    });
  } else {
    subscriberArray.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      }
    });
  }

  order = order === "asc" ? "desc" : "asc";
  renderTable(arrayInUse || subscriberArray);
}
