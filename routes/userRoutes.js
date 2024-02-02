const userControllers = require('../controllers/userControllers');
const express = require('express');
const routes = express.Router();
const { validate, validationMiddleware } = require('../middleware/validationMiddleware');

// route to get all users from the database
routes.get('/', validationMiddleware, userControllers.getAllUsers);

// route to update a user in the database
routes.put('/:id', validate('putUserById'), validationMiddleware, userControllers.updateUser);

module.exports = routes;