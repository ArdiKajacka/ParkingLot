function loadComplaintData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "subscriber.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var jsonResponse = JSON.parse(xhr.responseText);
      // Process the JSON data here
      console.log(jsonResponse);

      // Get the form element
      const form = document.getElementById('myForm');

      // Add event listener for form submission
      form.addEventListener('submit', function(event) {
        event.preventDefault();

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
          idCard: cardNumber,
          email: email,
          phone: phone,
          birthday: birthday,
          plateNumber: plateNumber,
          isDeleted: false
        };

        // Add the new subscriber object to the 'subscriber' array
        jsonResponse.subscriber.push(newSubscriber);

        // Convert the JavaScript object back to a JSON string
        const updatedJsonString = JSON.stringify(jsonResponse);

        // Create a new XMLHttpRequest object
        var postRequest = new XMLHttpRequest();
        postRequest.open("POST", "API_ENDPOINT", true); 
        postRequest.setRequestHeader("Content-Type", "application/json");

        postRequest.onreadystatechange = function () {
          if (postRequest.readyState === 4 && postRequest.status === 200) {
            // Request successful
            console.log(postRequest.responseText);
          }
        };

        // Send the updated JSON string in the request body
        postRequest.send(updatedJsonString);
      });
    }
  };

  xhr.send();
}
