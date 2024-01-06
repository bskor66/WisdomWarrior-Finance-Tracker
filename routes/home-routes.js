const router = require('express').Router();
const { User } = require('../models');
const checkAuth = require('../utils/checkAuth');
const dashboardRoutes = require('./dashboard');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    json.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  } catch (err) {
    json.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    json.status(500).json(err);
  }
});

// routes for rendering dashboard pages
router.use('/dashboard', checkAuth, dashboardRoutes);

module.exports = router;
