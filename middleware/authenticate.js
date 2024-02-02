// Import necessary modules and dependencies
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/userModels");
const session = require("express-session");

// Function to initialize Passport authentication with GitHub strategy
const initializePassport = () => {
    // Configure GitHub authentication strategy
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if the user already exists in the database
                    let user = await User.findOne({ githubId: profile.id });

                    // Create a new user object with GitHub profile data
                    const newUser = {
                        githubId: profile.id,
                        username: profile.username,
                        // Use displayName or fallback to username
                        displayName: profile.displayName || profile.username,
                        profileUrl: profile.profileUrl || "not available",
                        // Use the first photo's value or fallback to "not available"
                        avatarUrl: profile.photos[0]?.value || "not available",
                    };

                    // If the user exists, return the user
                    if (user) {
                        done(null, user);
                    } else {
                        // If the user doesn't exist, create a new user and return it
                        user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                    done(err, null);
                }
            }
        )
    );

    // Serialize user information to store in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user information from the session
    passport.deserializeUser((id, done) => {
        try {
            const user = User.findById(id);
            done(null, user);
        } catch (err) {
            console.error(err);
        }
    });
};

// Express session middleware configuration
const expressSession = session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
});

// Middleware function to authenticate requests
const authenticate = (req, res, next) => {
    // Check if the user is authenticated
    if (req.session.user === undefined) {
        return res.status(401).json({ message: "Unauthorized, permission not granted." });
    }
    next();
};

// Export the initialization function, authentication middleware, and session middleware
module.exports = { initializePassport, authenticate, expressSession };