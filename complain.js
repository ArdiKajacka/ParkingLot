// Function to load complaints data from the JSON file
function getComplaintsData() {
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

// Function to handle the form submission
function submitComplaintData() {
  // Get form values
  const firstName = document.getElementById('complaintFirstName').value;
  const lastName = document.getElementById('complaintLastName').value;
  const phone = document.getElementById('complaintPhone').value;
  const email = document.getElementById('complaintEmail').value;
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

  // Convert the JavaScript object to a JSON string
  const newComplaintJson = JSON.stringify(newComplaint);

  // Create a new XMLHttpRequest object
  var postRequest = new XMLHttpRequest();
  postRequest.open("POST", "complaints.json", true);
  postRequest.setRequestHeader("Content-Type", "application/json");

  postRequest.onreadystatechange = function () {
    if (postRequest.readyState === 4) {
      if (postRequest.status === 200) {
        // Request successful
        console.log(postRequest.responseText);
      } else {
        // Request failed
        console.error("Failed to submit complaint:", postRequest.responseText);
      }
    }
  };

  // Send the new complaint JSON string in the request body
  postRequest.send(newComplaintJson);
}

// Load complaints data when the page loads
getComplaintsData();

// Add event listener to the form's submit button
const submitButton = document.getElementById('complain-submit-button');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  submitComplaintData();
});
