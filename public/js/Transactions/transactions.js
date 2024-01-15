const createdAt = document.querySelectorAll('.created-at');
const deleteTransaction = document.querySelectorAll('.delete-transaction');
const editTransaction = document.querySelectorAll('.edit-transaction');
const editTransactionModal = document.querySelector('#editTransactionModal');
const closeTransactionModal = document.querySelector('#closeTransactionModal');
const saveTransactionModal = document.querySelectorAll('.saveTransactionModal');
const addTransaction = document.querySelectorAll('.add-transaction');
const budgetName = document.querySelectorAll('.budget-name');
// const budgetID = document.querySelectorAll('[data-budgetId]');
addTransaction.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      window.location.replace('/dashboard/transactions/add');
    })
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
closeTransactionModal.addEventListener('click', () => {
  editTransactionModal.close();
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

// budgetName.forEach((budget) =>{
//   console.log(budget.dataset.budgetid)


//   budget.addEventListener('DOMContentLoaded', async (e) => {
//     e.preventDefault();
//       const budgetId = budget.dataset.budgetid;
//       console.log(budgetId)
//       const response = await fetch(`/api/budgets/${budgetId}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log(response)
//       if (response.ok) {
//         const budget = await response.json();
//         document.querySelector('.budget-name').textContent = budget.name;
//         console.log(budget)
            
          
        
//       } else{
//         console.log("there is an error")
//       }
//   })
  

// })
budgetName.forEach((budget) => {
  // console.log(budget.dataset.budgetid);

  document.addEventListener('DOMContentLoaded', async () => {
    const budgetId = budget.dataset.budgetid;
    try {
      const response = await fetch(`/api/budgets/${budgetId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const budgetData = await response.json();
        budget.textContent = budgetData.name;
      } else {
        console.log("There is an error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});

  // budgetID
  // budgetName.