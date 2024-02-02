const express = require("express");
const routes = require("express").Router();
const passport = require("passport");
const { authenticate } = require("../middleware/authenticate");
const controller = require("../controllers/index");

// login route for GitHub
routes.get(
    "/login",
    passport.authenticate("github", (req, res) => {})
);

// logout route
routes.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// route to display message on home screen for logged in or out
routes.get('/', async (req, res) => {
    try {
        if (req.session.user !== undefined) {
            // if user is logged in, get details from session
            const userSession = req.session.user;
            // use displayName from session
            res.send(`Logged in as ${userSession.displayName}`);
        } else {
            // display that user is not logged in
            res.send('Logged out!');
        }
    } catch (error) {
        console.error('Error fetching user details', error);
        res.status(500).json({error: 'Internal Server Error.'});
    }
});
// route for GitHub callback
routes.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: "/api-docs",
        session: false,
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Route for connecting to the contacts routes
routes.use("/recipes", require("./recipesRoute"));

// Route for connecting to the users routes
routes.use('/users', authenticate, require('./userRoutes'));

module.exports = routes;
