document
  .getElementById('logoutBtn')
  .addEventListener('click', async function () {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const data = await response.json();
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
