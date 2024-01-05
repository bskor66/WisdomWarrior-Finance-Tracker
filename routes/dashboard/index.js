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

module.exports = router;
