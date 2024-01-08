const session = require('express-session');
const { User, Budgets, Transactions } = require('../models');

//* route: api/users/

const indexAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};
const indexUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const getOneUser = await User.findByPk(userId, {
      include: [
        {
          model: Budgets,
          attributes: {
            exclude: ['user_id'],
          },
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });
    if (!getOneUser) {
      return res.status(404).json('No user found with that ID');
    }
    res.json(getOneUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const indexBudgets = async (req, res) => {
  try {
    const userId = req.params.id;
    const getBudgets = await Budgets.findAll({
      where: {
        user_id: userId,
      },
      // attributes: {
      //   exclude: ['user_id'],
      // },
    });
    if (!getBudgets) {
      return res.status(404).json('No budgets found for that user');
    }
    res.json(getBudgets);
  } catch (err) {
    res.status(500).json(err);
  }
};
const indexTransactions = async (req, res) => {
  try {
    const userId = req.params.id;
    const getTransactions = await Transactions.findAll({
      where: {
        user_id: userId,
      },
    });
    if (!getTransactions) {
      return res.status(404).json('No Transactions found for that user');
    }
    res.json(getTransactions);
  } catch (err) {
    res.status(500).json(err);
  }
};
const postUser = async (req, res) => {
  try {
    const { firstName, lastName, userEmail, userPassword } = req.body;

    if (!(firstName && lastName && userEmail && userPassword)) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const createNewUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      password: userPassword
    })
    req.session.save(() => {
      req.session.logged_in = true
      req.session.user_id = createNewUser.id
      res.status(200).json(createNewUser)
    })
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'ValidationError'
    ) {
      return res
        .status(400)
        .json({ message: 'Validation error', errors: error.errors });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'User already exists' });
    }
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json('User updated');
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('User deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};
const loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json('Please provide your credentials');
      return;
    }

    const findUserEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!findUserEmail)
      return res.status(400).json('Incorrect email or password');

    const validatePassword = findUserEmail.checkPassword(req.body.password);
    if (!validatePassword)
      return res.status(400).json('Incorrect email or password');

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = findUserEmail.id;
      res.status(200).json('Successful login');
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const logoutUser = async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).json('Logged out').end();
    });
  } else {
    res.status(404).json('No user logged in').end();
  }
};
const postBudget = async (req, res) => {
  try {
    const newBudget = await Budgets.create({
      name: req.body.name,
      amount: req.body.amount,
      user_id: req.params.id,
    });
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to create a budget' });
      return;
    }

    if (!req.body.name || !req.body.amount) {
      res.status(400).json({ error: 'Must include id, name, and amount' });
      return;
    }
    res.json(newBudget);
  } catch (err) {
    res.status(500).json(err);
  }
};
const postTransaction = async (req, res) => {
  try {
    const newTransaction = await Transactions.create({
      is_expense: req.body.is_expense,
      transaction_amount: req.body.transaction_amount,
      user_id: req.params.user_id||req.body.user_id,
      budget_id: req.body.budget_id,
    });
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to create a Transation' });
      return;
    }

    if (!req.body.name || !req.body.amount) {
      res.status(400).json({ error: 'Must include Id, type, Amount and what budget its apart of.' });
      return;
    }
    res.json(newTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteBudget = async (req, res) => {
  try {
    const deleteBudget = await Budgets.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json('Budgets deleted');
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteTransaction = async (req, res) => {
  try {
    const deleteTransaction = await Transactions.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json('Transactions deleted');
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  indexAllUsers,
  indexUser,
  postUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  indexBudgets,
  indexTransactions,
  postBudget,
  postTransaction,
  deleteBudget,
  deleteTransaction,
};
