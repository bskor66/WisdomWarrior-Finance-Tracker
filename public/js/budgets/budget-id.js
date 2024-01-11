const backToBudgets = document.querySelector('#back-to-budgets');
const dollarAmountRemaining = document.querySelector('#dollarAmountRemaining');
const transactionExpense = document.querySelectorAll('[data-expense]');
const transactionIncome = document.querySelectorAll('[data-income]');
const createdAt = document.querySelectorAll('.created-at');
const deleteTransaction = document.querySelectorAll('.delete-transaction');
const editTransaction = document.querySelectorAll('.edit-transaction');
const editTransactionModal = document.querySelector('#editTransactionModal');
const closeTransactionModal = document.querySelector('#closeTransactionModal');
const saveTransactionModal = document.querySelectorAll('.saveTransactionModal');
const addTransaction = document.querySelector('#add-transaction');
// console.log(transactionExpense)

backToBudgets.addEventListener('click', () => {
  window.location.href = '/dashboard/budgets';
});

addTransaction.addEventListener('click', () => {
  window.location.href = '/dashboard/transactions/add';

});

editTransaction.forEach((transaction) => {
  transaction.addEventListener('click', async (e) => {
    e.preventDefault();
    const transactionId = transaction.dataset.id;
    console.log(transactionId)
    const response = await fetch(`/api/transactions/${transactionId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const transaction = await response.json();
      document.querySelector('#transaction-amount').value = transaction.transaction_amount;
      editTransactionModal.showModal();

      saveTransactionModal.forEach(transaction => {
        transaction.addEventListener('click', async (e) => {
          e.preventDefault();
      
          // const transactionId = transaction.dataset.id;
          // console.log(transactionId)
      
          let transaction_amount = document.querySelector('#transaction-update').value;
          const response = await fetch(`/api/transactions/${transactionId}`, {
            method: 'PUT',
            body: JSON.stringify({ transaction_amount }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            window.location.reload();
          } else {
            alert('Failed to update transaction');
          }
        });
      })
    }
  });
});

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




closeTransactionModal.addEventListener('click', () => {
  editTransactionModal.close();
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



