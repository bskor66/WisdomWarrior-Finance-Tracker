const express = require('express');
const router = express.Router();

// Homepage
router.get('/', async (req, res) => {
  try {
    res.render('dash-landing', { layout: 'dashboard' });
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Page
router.get('/account', async (req, res) => {
  try {
    res.render('account');
  } catch (err) {
    json.status(500).json(err);
  }
});

// Account Edit Page
router.get('account/edit', async (req, res) => {
  try {
    res.render('account-edit');
  } catch (err) {
    json.status(500).json(err);
  }
});

// Budget Page
router.get('/budget', async (req, res) => {
  try {
    res.render('budget');
  } catch (err) {
    json.status(500).json(err);
  }
});

// Add Budget Page
router.get('/budget/add', async (req, res) => {
  try {
    res.render('budget-edit');
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Page
router.get('/transactions', async (req, res) => {
  try {
    res.render('transactions');
  } catch (err) {
    json.status(500).json(err);
  }
});

// Transactions Add Page
router.get('/transactions/add', async (req, res) => {
  try {
    res.render('transactions-add');
  } catch (err) {
    json.status(500).json(err);
  }
});

module.exports = router;
