const addTransaction = document.querySelectorAll('.add-transaction');

addTransaction.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      window.location.replace('/dashboard/transactions/add');
    })
  });