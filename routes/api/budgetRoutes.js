const express = require('express');
const router = express.Router();
const budgetController = require('../../controllers/api-budget-controller');

// API route to get all budgets
router.get('/', budgetController.getAllBudgets);

module.exports = router;
