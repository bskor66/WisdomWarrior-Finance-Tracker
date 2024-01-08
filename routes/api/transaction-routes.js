const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/api-transaction-controller');

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransaction);
router.get('/', transactionController.createTransaction);
router.get('/:id', transactionController.updateTransaction);
router.get('/:id', transactionController.deleteTransaction);

module.exports = router;
