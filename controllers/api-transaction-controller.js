// will require sequelize connection and models to perform logic
const { Transactions, User, Budgets } = require('../models');
const sequelize = require('../config/connection');
const { update } = require('../models/User');

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      include: [User, Budgets],
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const getOneTransaction = await Transactions.findByPk(transactionId);
    if (!getOneTransaction) {
      return res.status(404).json('No Transaction found with that ID');
    }
    res.json(getOneTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTransaction = async (req, res) => {
  try {
    const { isExpense, transactionAmount, budgetId } = req.body;

    if (!req.body.isExpense || !req.body.transactionAmount) {
      res.status(400).json({ error: 'Must include Id, Amount, type and what budget its apart of.' });
      return;
    }
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to create a Transaction' });
      return;
    }
    const newTransaction = await Transactions.create({
      is_expense: isExpense,
      transaction_amount: transactionAmount,
      user_id: req.session.user_id,
      budget_id: budgetId,
    });
    res.json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);

    // Send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const deleteTransaction = async (req, res) => {
  try {
    const deleteTransaction = await Transactions.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('Transaction deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transactions.update({
      transaction_amount: req.body.transaction_amount,
    },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id || req.body.user_id
        },
      });
    if (!req.body.name || !req.body.transaction_amount) {
      res.status(400).json({ error: 'Must include amount' });
      return;
    }
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to update a transaction' });
      return;
    }
    if (!updatedTransaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json(updatedTransaction);
  } catch {

  }
};
module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction
};
