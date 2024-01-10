const submitBtn = document.querySelector('#submitBtn');
const cancelBtn = document.querySelector('#cancelBtn');

cancelBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  window.location.replace('/dashboard/budgets');
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const isExpense = document.querySelector('#isExpense-dropdown').value;
  const transactionAmount = document.querySelector('#budget-amount').value.trim();
  const budgetId = document.querySelector('#budget-dropdown').value;
  console.log(budgetId)

  if (!isExpense && !transactionAmount && !budgetId ) {
    
  }
  const response = await fetch('/api/Transactions', {
    method: 'POST',
    body: JSON.stringify({ isExpense, transactionAmount, budgetId}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.replace('/dashboard/Transactions');
  } else {
    alert('Failed to create Transaction');
  }
});