// will require sequelize connection and models to perform logic
const { Transactions, User, Budgets } = require('../models');
const sequelize = require('../config/connection');

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
const postTransaction = async (req, res) => {
  try{
    const { isExpense, transactionAmount, userId, budgetId} = req.body;

    const newTransaction = await Transactions.create({
      is_expense: isExpense,
      transaction_amount: transactionAmount,
      user_id: userId,
      budget_id: budgetId,
    });
  } catch(error){

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
module.exports = {
  getAllTransactions,
};
