// Function to load subscriber data from the JSON file
function getSubscriberData() {
  var xhr = new XMLHttpRequest();
  //api/subscribers
  xhr.open("GET", "https://localhost:7145/api/subscribers", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var jsonResponse = JSON.parse(xhr.responseText);
      console.log(jsonResponse);
    }
  };

  xhr.send();
}
function test() {
  debugger
}

// Function to handle the form submission
function submitSubscriberData() {
  // Get form values
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const birthday = document.getElementById('birthday').value;
  const plateNumber = document.getElementById('plateNumber').value;

  // Create subscriber object
  const newSubscriber = {
    firstName: firstName,
    lastName: lastName,
    idCard: parseInt(cardNumber),
    email: email,
    phone: phone,
    birthday: birthday,
    plateNumber: plateNumber,
    isDeleted: false
  };

  // Convert the JavaScript object to a JSON string
  const newSubscriberJson = JSON.stringify(newSubscriber);

  // Create a new XMLHttpRequest object
  var postRequest = new XMLHttpRequest();
  postRequest.open("POST", "subscriber.json", true);
  postRequest.setRequestHeader("Content-Type", "application/json");

  postRequest.onreadystatechange = function () {
    if (postRequest.readyState === 4) {
      if (postRequest.status === 200) {
        // Request successful
        console.log(postRequest.responseText);
      } else {
        // Request failed
        console.error("Failed to create subscriber:", postRequest.responseText);
      }
    }
  };

  // Send the new subscriber JSON string in the request body
  postRequest.send(newSubscriberJson);
}

// Load subscriber data when the page loads
getSubscriberData();
test();

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  submitSubscriberData();
});