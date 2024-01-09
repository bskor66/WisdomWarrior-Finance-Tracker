const form = document.getElementById('signupForm');

const sendData = async (data) => {
  try {
    const response = await fetch('api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      console.error('Error: Signup was not successful');
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    userEmail: formData.get('email'),
    userPassword: formData.get('password'),
  };
  sendData(userData);
};

form.addEventListener('submit', handleFormSubmit);
