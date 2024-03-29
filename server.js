const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('./db/mongo');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session')
const { initializePassport, expressSession, } = require('./middleware/authenticate');
// const API_KEY = process.env.API_KEY;

// Middleware for CORS
app.use(cors());

// Middleware to set headers and serve Swagger UI
app.use((req, res, next) => {
    // Set headers to allow cross-origin requests
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, z-key');

    // Set API key from request headers
    req.query.API_KEY = req.headers["z-key"];
    
    next();
});

// use session middleware
app.use( session({ secret: 'secret', resave: false, saveUninitialized: true,}));

// initialize passport and setup session management
initializePassport();

// use express session middleware
app.use(expressSession);

// initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(swaggerFile)(req, res, next);
});

// Middleware for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Routes
app.use('/', require('./routes'));

// Start server
const port = process.env.PORT || 5100;

// Use mongo for the database connection
mongo.connectDb().then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}).catch(err => {
    console.log('Error: ', err.message);
    process.exit(1);
});