const express = require('express');
const router = express.Router();
const { User, Budgets, Transactions } = require('../../models');
const dashboardController = require('../../controllers/dashboard-controller');
// const checkAuth = require('../../utils/checkAuth');

// Homepage
router.get('/', async (req, res) => {
  try {
    // const budgets = dashboardController.userBudgets;
    // const transactions = dashboardController.userTransactions;

    res.render('dash-landing', { layout: 'dashboard' });
  } catch (err) {
    console.log(err)
  }
});

// Account Page
router.get('/account', async (req, res) => {
  // const userData = dashboardController.userData(req.session.user_id)
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
//   try {
//     // const budgets = dashboardController.userBudgets;

//     res.render('budgets', { layout: 'dashboard', budgets });
//   } catch (err) {
//     console.log(err)
//   }
});

// budget by id
// router.get('budgets/:id', async (req, res) => {
//   try {
//     const budgets = dashboardController.userBudgetsById;

//     res.render('budget', { layout: 'dashboard', budgets });
//   } catch (err) {
//     json.status(500).json(err);
//   }
// });

// // Add Budget Page
// router.get('/budgets/add', async (req, res) => {
//   try {
//     res.render('budget-edit', { layout: 'dashboard' });
//   } catch (err) {
//     json.status(500).json(err);
//   }
// });

// Transactions Page
router.get('/transactions', async (req, res) => {
  // try {
  //   const transactions = dashboardController.userTransactions;

  //   res.render('transactions', { layout: 'dashboard', transactions });
  // } catch (err) {
  //   json.status(500).json(err);
  // }
});

// transactions by id
router.get('/transactions/:id', async (req, res) => {
  // try {
  //   const transactions = dashboardController.userTransactionsById;

  //   res.render('transactions', { layout: 'dashboard', transactions });
  // } catch (err) {
  //   json.status(500).json(err);
  // }
});

// Transactions Add Page
router.get('/transactions/add', async (req, res) => {
  // try {
  //   res.render('transactions-add', { layout: 'dashboard' });
  // } catch (err) {
  //   json.status(500).json(err);
  // }
});

module.exports = router;
