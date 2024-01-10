const express = require('express');
const router = express.Router();
const { User, Budgets, Transactions } = require('../../models');
const dashboardController = require('../../controllers/dashboard-controller');

// Homepage
router.get('/', async (req, res) => {
  try {
    res.render('dash-landing', { layout: 'dashboard' });
  } catch (err) {
    console.log(err)
  }
});

// Account Page
router.get('/account', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Budgets,
          attributes: {
            exclude: ['user_id'],
          },
        },
        {
          model: Transactions,
          attributes: {
            exclude: ['user_id'],
          },
        },
      ],
    });
    const userData = user.get({ plain: true })
    console.log(userData)

    if (!userData) {
      return res.status(404).json('No user found with that ID');
    }

    res.render('account', { layout: 'dashboard', userData });
  } catch (err) {
    console.log(err)
  }
});

// Budget Page
router.get('/budgets', async (req, res) => {
  try {
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

    const transactions = await Transactions.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });
    const transactionData = transactions.map((transaction) => transaction.get({ plain: true }));

    res.render('transactions', { layout: 'dashboard', transactionData });
  } catch (err) {
    console.log(err); 
  }
});

// transactions by id
router.get('/transactions/:id', async (req, res) => {
  try {

    const transaction = await Transactions.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id,
        id: req.params.id,
      }
    });
    const transactionData = transaction.get({ plain: true });

    res.render('transactions-id', { layout: 'dashboard', transactionData });
  } catch (err) {
    console.log(err);
  }
});

// Transactions Add Page
router.get('/transactions/add', async (req, res) => {
  try {
    res.render('transactions-add', { layout: 'dashboard' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
