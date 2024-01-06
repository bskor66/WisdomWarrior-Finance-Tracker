const express = require('express');
const router = express.Router();

//Homepage
router.get('/', async (req, res) => {
  try {
    res.render('dash-landing', { layout: 'dashboard' });
  } catch (err) {
    json.status(500).json(err);
  }
});

router.get('/account', async (req, res) => {
  try {
    res.render('account');
  } catch (err) {
    json.status(500).json(err);
  }
});

router.get('/budget', async (req, res) => {
  try {
    res.render('budget');
  } catch (err) {
    json.status(500).json(err);
  }
});

router.get('/transactions', async (req, res) => {
  try {
    res.render('transactions');
  } catch (err) {
    json.status(500).json(err);
  }
});


router.get('')

module.exports = router;
