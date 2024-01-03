const express = require('express');
const router = express.Router();
const Budgets = require('../models/Budgets');

// API route to get all budgets
router.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await Budgets.findAll({
      include: ['categories', 'user'], 
    });   
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
