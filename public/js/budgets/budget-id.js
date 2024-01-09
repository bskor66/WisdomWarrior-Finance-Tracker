const backToBudgets = document.querySelector('#back-to-budgets');
const dollarAmountRemaining = document.querySelector('#dollarAmountRemaining');
const transactionExpense = document.querySelectorAll('[data-expense]');
const transactionIncome = document.querySelectorAll('[data-income]');
const createdAt = document.querySelectorAll('.created-at');
const deleteTransaction = document.querySelectorAll('.delete-transaction');
// console.log(transactionExpense)

deleteTransaction.forEach((transaction) => {
  transaction.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = transaction.dataset.id;
    console.log(id)
    const response = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to delete transaction');
    }
  });
});

createdAt.forEach((date) => {
  const dateCreated = date.dataset.timestamp;
  const originalDate = new Date(dateCreated);

  const year = originalDate.getFullYear().toString().slice(2); // Get the last two digits of the year
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const day = originalDate.getDate().toString().padStart(2, '0');
  let hours = originalDate.getHours();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const minutes = originalDate.getMinutes().toString().padStart(2, '0');
  const seconds = originalDate.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  date.textContent = formattedDate;
  // console.log(formattedDate);

});

let expenseTotal = 0
transactionExpense.forEach((transaction) => {
  const expense = parseInt(transaction.dataset.expense);
  expenseTotal += expense;
});

let incomeTotal = 0
transactionIncome.forEach((transaction) => {
  const income = parseInt(transaction.dataset.income);
  incomeTotal += income;
});

let remaining = dollarAmountRemaining.dataset.remaining - expenseTotal;

dollarAmountRemaining.textContent = remaining || dollarAmountRemaining.dataset.remaining;


backToBudgets.addEventListener('click', () => {
  window.location.href = '/dashboard/budgets';
});

