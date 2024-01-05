const form = document.getElementById('userLoginForm');

const sendData = async (userData) => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  let formData = new FormData(form);
  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  sendData(userData);
};

form.addEventListener('submit', handleFormSubmit);
