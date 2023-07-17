// JSON data
const existingJsonString = `{
    "subscriber": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "idCard": 123456789,
        "email": "johndoe@example.com",
        "phone": 987654321,
        "plateNumber": 1234,
        "isDeleted": false
      },
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "idCard": 987654321,
        "email": "janesmith@example.com",
        "phone": 123456789,
        "plateNumber": 5678,
        "isDeleted": false
      },
      {
        "firstName": "Alice",
        "lastName": "Johnson",
        "idCard": 111111111,
        "email": "alicejohnson@example.com",
        "phone": 222222222,
        "plateNumber": 9102,
        "isDeleted": false
      },
      {
        "firstName": "Bob",
        "lastName": "Smithson",
        "idCard": 333333333,
        "email": "bobsmithson@example.com",
        "phone": 444444444,
        "plateNumber": 2468,
        "isDeleted": false
      },
      {
        "firstName": "Emily",
        "lastName": "Brown",
        "idCard": 555555555,
        "email": "emilybrown@example.com",
        "phone": 666666666,
        "plateNumber": 1357,
        "isDeleted": false
      },
      {
        "firstName": "Michael",
        "lastName": "Davis",
        "idCard": 777777777,
        "email": "michaeldavis@example.com",
        "phone": 888888888,
        "plateNumber": 7890,
        "isDeleted": false
      },
      {
        "firstName": "Sophia",
        "lastName": "Wilson",
        "idCard": 999999999,
        "email": "sophiawilson@example.com",
        "phone": 101010101,
        "plateNumber": 1111,
        "isDeleted": false
      }
    ]
  }`;
  
  // Parse the existing JSON data into a JavaScript object
  const existingJsonObject = JSON.parse(existingJsonString);
  
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
  
    // Add the new subscriber object to the 'subscriber' array
    existingJsonObject.subscriber.push(newSubscriber);
  
    // Convert the JavaScript object back to a JSON string
    const updatedJsonString = JSON.stringify(existingJsonObject);
  
    // Log the updated JSON string (you can send it to a server or perform any other action here)
    console.log(updatedJsonString);
  }
  
  // Get the form element
  const form = document.getElementById('myForm');
  
  // Add event listener for form submission
  form.addEventListener('submit', handleFormSubmission);
  