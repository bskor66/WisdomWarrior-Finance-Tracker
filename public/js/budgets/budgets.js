const addBudget = document.querySelectorAll('.add-budget');
const editBudget = document.querySelectorAll('.edit-budget');
const deleteBudget = document.querySelectorAll('.delete-budget');
const saveChangesBtn = document.querySelector('#saveChangesBtn');
const cancelChangesBtn = document.querySelector('#cancelChangesBtn');
const editBudgetModal = document.querySelector('#editBudgetModal');
const budgetName = document.querySelectorAll('.budget-name');
// console.log(deleteBudget)

budgetName.forEach(card => {
  card.addEventListener('click', async (e) => {
    e.preventDefault();
    const budgetId = e.target.dataset.id;
    // console.log(budgetId)
    window.location.replace(`/dashboard/budgets/${budgetId}`);
  })
});

addBudget.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.replace('/dashboard/budgets/add');
  })
});

deleteBudget.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const budgetId = e.target.dataset.id;
    console.log(budgetId)
    const response = await fetch(`/api/budgets/${budgetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to delete budget');
    }
  })
});

editBudget.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const budgetId = e.target.dataset.id;
    const response = await fetch(`/api/budgets/${budgetId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const budget = await response.json();
      document.querySelector('#budget-name').value = budget.name;
      document.querySelector('#budget-amount').value = budget.amount;
      saveChangesBtn.dataset.id = budget.id;
      editBudgetModal.showModal();
    } else {
      alert('Failed to get budget');
    }
  })
});

saveChangesBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const budgetId = e.target.dataset.id;
  const name = document.querySelector('#budget-name').value.trim();
  const amount = document.querySelector('#budget-amount').value.trim();
  const response = await fetch(`/api/budgets/${budgetId}`, {
    method: 'PUT',
    body: JSON.stringify({ name, amount }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    window.location.replace('/dashboard/budgets');
  } else {
    alert('Failed to update budget');
  }
});

cancelChangesBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
});


