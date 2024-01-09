document
  .getElementById('changePasswordForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const currentPassword = document.querySelector('#old-password').value;
    const newPassword = document.querySelector('#new-password').value;

    const response = await fetch(`/api/users/${req.session.user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (response.ok) {
      // Handle successful password change
      console.log('Password changed successfully');
    } else {
      // Handle error
      console.error('Error changing password');
    }
  });
