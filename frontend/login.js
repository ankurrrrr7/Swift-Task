document.querySelector('.registration-form').addEventListener('submit', sendData);

function sendData(e) {
  e.preventDefault();

  const Enteredpayload = {
    userName: document.getElementById('username').value,  // username input
    email: document.getElementById('email').value,         // email input
    password: document.getElementById('password').value    // password input
  };

  axios.post('http://localhost:3000/register', Enteredpayload)
    .then(response => {
      alert('New user added');
    })
    .catch(err => {
      console.error(err);
      alert('Failed to register. Check console for error.');
      if (error.response && error.response.data) {
    console.log('Backend validation errors:', error.response.data.errors);
    alert(`Validation error: ${error.response.data.message}`);
    } else {
    alert('Registration failed');
    }
    });
}
