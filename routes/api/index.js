const router = require('express').Router();

const userRoutes = require('./api/userRoutes');
const budgetRoutes = require('./api/budgetRoutes');
const transactionRoutes = require('./api/transactionRoutes');

//* route: /api

router.use('/users', userRoutes);
router.use('/budgets', budgetRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router