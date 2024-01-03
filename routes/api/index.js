const router = require('express').Router();
const userRoutes = require('./userRoutes');
const budgetRoutes = require('./budgetRoutes');
// const transactionRoutes = require('./transactionRoutes');
// const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/budgets', budgetRoutes)
// router.use('/transactions', transactionRoutes)
// router.use('/categories', categoryRoutes)

module.exports = router;
