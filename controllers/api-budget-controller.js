// will require sequelize connection and models to perform logic
const { Budgets, User } = require('../models/');
// const Categories = require('../models/')
// const User = require('../models/')
const sequelize = require('../config/connection');

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budgets.findAll({
      include:
        [
          {
            model: User
          }
        ],
        attributes: {
          exclude: ['user_id']
        }
    }
    );
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllBudgets,
}