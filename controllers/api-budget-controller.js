const { Budgets, User } = require('../models/');
const sequelize = require('../config/connection');

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budgets.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          }
        }
      ],
      attributes: {
        exclude: ['user_id'],
      },
    });
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getBudgetById = async (req, res) => {
  try {
    const budget = await Budgets.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          }
        }
      ],
      attributes: {
        exclude: ['user_id'],
      },
    })
    if (!budget) {
      res.status(404).json({ error: 'Budget not found' });
      return;
    }
    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createBudget = async (req, res) => {
  try {
    const newBudget = await Budgets.create({
      name: req.body.name,
      amount: req.body.amount,
      user_id: req.session.user_id || req.body.user_id,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budgets.update({
      name: req.body.name,
      amount: req.body.amount,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id || req.body.user_id
      },
    });
    if (!req.body.name || !req.body.amount) {
      res.status(400).json({ error: 'Must include name and amount' });
      return;
    }
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to update a budget' });
      return;
    }
    if (!updatedBudget) {
      res.status(404).json({ error: 'Budget not found' });
      return;
    }
    res.json(updatedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budgets.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id || req.body.user_id,
      },
    });
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to delete a budget' });
      return;
    }
    if (!deletedBudget) {
      res.status(404).json({ error: 'Budget not found' });
      return;
    }
    res.json(deletedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
};
