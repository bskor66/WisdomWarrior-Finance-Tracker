const form = document.getElementById('signupForm');

const sendData = async (userData) => {
  try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      window.location.href = '/dashboard';
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
