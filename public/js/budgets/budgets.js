const addBudget = document.querySelector('#add-budget');
const editBudget = document.querySelector('#edit-budget');
const deleteBudget = document.querySelectorAll('.delete-budget');
console.log(deleteBudget)

addBudget.addEventListener('click', async (e) => {
  e.preventDefault();
  window.location.replace('/dashboard/budgets/add');
})

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