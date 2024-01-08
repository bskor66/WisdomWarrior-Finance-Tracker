const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/api-transaction-controller');

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransaction);
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
