const submitBtn = document.querySelector('#submitBtn');
const cancelBtn = document.querySelector('#cancelBtn');

cancelBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  window.location.replace('/dashboard/budgets');
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#budget-name').value.trim();
  const amount = document.querySelector('#budget-amount').value.trim();

  if (!name && !amount) {
    
  }
  const response = await fetch('/api/budgets', {
    method: 'POST',
    body: JSON.stringify({ name, amount }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.replace('/dashboard/budgets');
  } else {
    alert('Failed to create budget');
  }
});