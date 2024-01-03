// will require sequelize connection and models to perform logic
const { Transactions, User } = require('../models');
const sequelize = require('../config/connection');

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      include: [User],
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllTransactions
}