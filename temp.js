    // Function to handle form submission
    function handleFormSubmission(event) {
      event.preventDefault(); // Prevent form submission

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

      // Convert the subscriber object to JSON string
      const newSubscriberJson = JSON.stringify(newSubscriber);

      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();

      // Define the request
      xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      // Set up the onload event handler
      xhr.onload = function() {
        if (xhr.status === 201) {
          console.log('Subscriber added successfully!');
        } else {
          console.log('Failed to add subscriber.');
        }
      };

      // Send the request with the subscriber data
      xhr.send(newSubscriberJson);

      // Reset the form
      document.getElementById('myForm').reset();
    }

    // Get the form element
    const form = document.getElementById('myForm');

    // Add event listener for form submission
    form.addEventListener('submit', handleFormSubmission);

    function getDataFromAPI() {
        const xhr = new XMLHttpRequest();
      
        xhr.open('GET', 'https://dummyjson.com/users', true);
      
        xhr.onload = function() {
          if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
          } else {
            console.log('Failed to fetch data from the API.');
          }
        };
      
        xhr.send();
      }