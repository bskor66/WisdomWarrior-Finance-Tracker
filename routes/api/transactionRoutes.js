const express = require('express');
const router = express.Router();
const Transactions = require('../models/Transactions');

router.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      include: ['user', 'category'], 
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
