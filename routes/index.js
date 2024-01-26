const routes = require('express').Router();
const controller = require('../controllers/index');

// Route for the home page
routes.get('/', controller.home);

// Route for connecting to the contacts routes
routes.use('/recipes', require('./recipesRoute'));

module.exports = routes;