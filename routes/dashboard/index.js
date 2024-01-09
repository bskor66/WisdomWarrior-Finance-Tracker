const express = require('express');
const router = express.Router();
const { User, Budgets, Transactions } = require('../../models');
const dashboardController = require('../../controllers/dashboard-controller');
// const checkAuth = require('../../utils/checkAuth');


// Homepage
router.get('/', async (req, res) => {
  try {
    const budgets = dashboardController.userBudgets
    const transactions = dashboardController.userTransactions

    res.render('dash-landing', { layout: 'dashboard', budgets, transactions });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Page
router.get('/account', async (req, res) => {
  try {
    const userData = dashboardController.userData

    res.render('account', { layout: 'dashboard', userData });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Edit Page
router.get('account/edit', async (req, res) => {
  try {
    res.render('account-edit', { layout: 'dashboard', });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Budget Page
router.get('/budgets', async (req, res) => {
  try {
    // make it look like this - do the thing
    // const budgets = await dashboardController.userBudgets()
    const budget = await Budgets.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    
    const budgetData = budget.map((budget) => budget.get({ plain: true }));

    res.render('budgets', { layout: 'dashboard', budgetData });
  } catch (err) {
    console.log(err);
  }
});

// budget by id
router.get('/budgets/add', async (req, res) => {
  try {
    res.render('budget-add', { layout: 'dashboard', });
  } catch (err) {
    json.status(500).json(err);
  }
});

router.get('/budgets/:id', async (req, res) => {
  try {
    // const budgets = dashboardController.userBudgetsById
    const budget = await Budgets.findByPk(req.params.id, {
      where: {
        // user_id: req.session.user_id,
        id: req.params.id,
      }
    });
    const budgetData = budget.get({ plain: true });
    console.log(budgetData);  

    const transactions = await Transactions.findAll({
      where: {
        user_id: req.session.user_id,
        budget_id: req.params.id,
      }
    });
    const transactionsData = transactions.map((transaction) => transaction.get({ plain: true }));
    console.log(transactionsData);

    res.render('budget-id', { layout: 'dashboard', budgetData, transactionsData });
  } catch (err) {
    res.status(500)
  }
});

// Add Budget Page

// Transactions Page
router.get('/transactions', async (req, res) => {
  try {
    const transactions = dashboardController.userTransactions

    res.render('transactions', { layout: 'dashboard', transactions });
  } catch (err) {
    json.status(500).json(err);
  }
});

// transactions by id
router.get('/transactions/:id', async (req, res) => {
  try {
    const transactions = dashboardController.userTransactionsById

    res.render('transactions', { layout: 'dashboard', transactions });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Add Page
router.get('/transactions/add', async (req, res) => {
  try {
    res.render('transactions-add', { layout: 'dashboard', });
  } catch (err) {
    json.status(500).json(err);
  }
});

module.exports = router;
