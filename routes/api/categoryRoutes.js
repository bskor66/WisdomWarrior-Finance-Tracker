const express = require('express');
const router = express.Router();
const Categories = require('../models/Categories');

// API route to get all categories
router.get('/api/categories', async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
``