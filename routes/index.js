const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const budgetRoutes = require('./api/budgetRoutes');
const transactionRoutes = require('./api/transactionRoutes');

// const apiRoutes = require('./api');
// router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/budgets', budgetRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router;
