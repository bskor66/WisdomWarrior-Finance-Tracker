const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard');

// route for render pages. Routes used to pass data through handlebars
router.use('/', homeRoutes);

// routes for rendering dashboard pages
router.use('/dashboard', dashboardRoutes);

// api routes that return data in json format and handle cookie/session data
router.use('/api', apiRoutes);

module.exports = router;
