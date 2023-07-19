// Function to load complaints data using XMLHttpRequest GET request
function loadComplaintsData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "complaints.json", true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var jsonResponse = JSON.parse(xhr.responseText);
        // Process the JSON data here
        console.log(jsonResponse);
      }
    };
  
    xhr.send();
  }
  
  // Function to handle form submission using XMLHttpRequest POST request
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const complaintType = document.getElementById('complaintType').value;
    const complaintDetails = document.getElementById('complaintDetails').value;
  
    // Create complaint object
    const newComplaint = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      complaintType: complaintType,
      complaintDetails: complaintDetails
    };
  
    // Add the new complaint object to the 'complaints' array
    complaintsJsonObject.complaints.push(newComplaint);
  
    // Convert the JavaScript object back to a JSON string
    const updatedJsonString = JSON.stringify(complaintsJsonObject);
  
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "complaints.json", true); // REPLACE WITH YOUR SERVER-SIDE API ENDPOINT
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Request successful
        console.log(xhr.responseText);
      }
    };
  
    // Send the updated JSON string in the request body
    xhr.send(updatedJsonString);
  
    // Reset the form
    document.getElementById('complaints').reset();
  }
  
  // Get the form element
  const form = document.getElementById('complaints');
  
  // Add event listener for form submission
  form.addEventListener('submit', handleFormSubmission);
  