const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const dashboardController = require('../../controllers/dashboard-controller');
// const checkAuth = require('../../utils/checkAuth');

// Homepage
router.get('/', async (req, res) => {
  try {
    const budgets = dashboardController.userBudgets;
    const transactions = dashboardController.userTransactions;

    res.render('dash-landing', { layout: 'dashboard', budgets, transactions });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Page
router.get('/account', async (req, res) => {
  try {
    const userData = dashboardController.userData;

    res.render('account', { layout: 'dashboard', userData });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Budget Page
router.get('/budgets', async (req, res) => {
  try {
    const budgets = dashboardController.userBudgets;

    res.render('budgets', { layout: 'dashboard', budgets });
  } catch (err) {
    json.status(500).json(err);
  }
});

// budget by id
router.get('budgets/:id', async (req, res) => {
  try {
    const budgets = dashboardController.userBudgetsById;

    res.render('budget', { layout: 'dashboard', budgets });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Add Budget Page
router.get('/budgets/add', async (req, res) => {
  try {
    res.render('budget-edit', { layout: 'dashboard' });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Page
router.get('/transactions', async (req, res) => {
  try {
    const transactions = dashboardController.userTransactions;

    res.render('transactions', { layout: 'dashboard', transactions });
  } catch (err) {
    json.status(500).json(err);
  }
});

// transactions by id
router.get('/transactions/:id', async (req, res) => {
  try {
    const transactions = dashboardController.userTransactionsById;

    res.render('transactions', { layout: 'dashboard', transactions });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Add Page
router.get('/transactions/add', async (req, res) => {
  try {
    res.render('transactions-add', { layout: 'dashboard' });
  } catch (err) {
    json.status(500).json(err);
  }
});

module.exports = router;
