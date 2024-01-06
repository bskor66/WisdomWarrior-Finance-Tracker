const express = require('express');
const router = express.Router();
const { User, Budgets, Transactions } = require('../../models');
// const checkAuth = require('../../utils/checkAuth');

// Homepage
router.get('/', async (req, res) => {
  try {
    const budgets = await Budgets.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });
    const budgetsData = budgets.map((budget) => budget.get({ plain: true }));

    const transactions = await Transactions.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });
    const transactionsData = transactions.map((transaction) => transaction.get({ plain: true }));

    res.render('dash-landing', { layout: 'dashboard', budgetsData, transactionsData });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Page
router.get('/account', async (req, res) => {
  try {
    const getUser = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Budget }],
    });
    res.render('account', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Edit Page
router.get('account/edit', async (req, res) => {
  try {
    res.render('account-edit', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// Budget Page
router.get('/budget', async (req, res) => {
  try {
    res.render('budget', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// budget by id
router.get('budget/:id', async (req, res) => {
  try {
    res.render('budget', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// Add Budget Page
router.get('/budget/add', async (req, res) => {
  try {
    res.render('budget-edit', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Page
router.get('/transactions', async (req, res) => {
  try {
    res.render('transactions', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// transactions by id
router.get('/transactions/:id', async (req, res) => {
  try {
    res.render('transactions', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Add Page
router.get('/transactions/add', async (req, res) => {
  try {
    res.render('transactions-add', {layout: 'dashboard',});
  } catch (err) {
    json.status(500).json(err);
  }
});

module.exports = router;
