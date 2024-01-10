const { User, Budgets, Transactions } = require('../models');

// Queries user data - excludes password - includes budgets and transactions
const userData = async (user_id) => {
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
    const userData = user.map((user) => user.get({ plain: true }))
    
    if (!userData) {
      return res.status(404).json('No user found with that ID');
    }
    return userData;
  } catch (err) {
    res.status(500).json(err);
  }
};

// Queries user budgets
const userBudgets = async (req, res) => {
  const budgets = await Budgets.findAll({
    where: {
      user_id: req.session.user_id,
    }
  });
  const budgetsData = budgets.map((budget) => budget.get({ plain: true }));
  return budgetsData;
};

// Queries user budgets by id
const userBudgetsById = async (req, res) => {
  const budget = await Budgets.findByPk(req.params.id, {
    where: {
      user_id: req.session.user_id,
      id: req.params.id,
    }
  });
  const budgetData = budget.get({ plain: true });
  return budgetData;
};

// Queries user transactions
const userTransactions = async (req, res) => {
  const transactions = await Transactions.findAll({
    where: {
      user_id: req.session.user_id,
    }
  });
  const transactionsData = transactions.map((transaction) => transaction.get({ plain: true }));
  return transactionsData;
};

// Queries user transactions by id
const userTransactionsById = async (req, res) => {
  const transaction = await Transactions.findByPk(req.params.id, {
    where: {
      user_id: req.session.user_id,
      id: req.params.id,
    }
  });
  const transactionData = transaction.get({ plain: true });
  return transactionData;
};

module.exports = {
  userBudgets,
  userTransactions,
  userBudgetsById,
  userTransactionsById,
  userData,
}