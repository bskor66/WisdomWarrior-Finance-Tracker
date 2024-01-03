const router = require('express').Router();

const userRoutes = require('./user-routes');
const budgetRoutes = require('./budget-routes');
const transactionRoutes = require('./transaction-routes');

//* route: /api

router.use('/users', userRoutes);
router.use('/budgets', budgetRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router