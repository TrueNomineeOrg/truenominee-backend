const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./db');


const userController = require('./controllers/authController');
const validator = require('./validator');


const app = express();
const generalRoute = require('./routes/generalRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


 // Apply middleware to all routes
app.use(validator.validateSessionToken);

// Session setup
// app.use(session({
//   secret: 'secret', // Change this to a real secret in production
//   resave: false,
//   saveUninitialized: true,
// }));

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Define routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Connect to MongoDB
connectDB();

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.use('/api', generalRoute);

// Define your routes using the imported functions
app.post('/sendOtp', userController.sendOtp);
app.post('/verifyOtp', userController.verifyOtp);
// app.get('/validate', userController.fetchSession);
app.get('/createSession', userController.createSession);
app.get('/loginViaGmail', userController.loginViaGmail);