const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const checkAuth = require('../utils/checkAuth');

// route for render pages. Routes used to pass data through handlebars
router.use('/', homeRoutes);

// api routes that return data in json format and handle cookie/session data
router.use('/api', apiRoutes);

module.exports = router;
