const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cookieParser = require('cookie-parser')

const userController = require('./controllers/authController');
const validator = require('./validator');


const app = express();
const generalRoute = require('./routes/generalRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
  });

 // Apply middleware to all routes
app.use(validator.validateSessionToken);

// Define routes here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Connect to MongoDB
connectDB();
app.use('/api', generalRoute);

// Define your routes using the imported functions
app.post('/sendOtp', userController.sendOtp);
app.post('/verifyOtp', userController.verifyOtp);
app.get('/validate', userController.authenticateSession);
app.get('/createSession', userController.createSession);
app.post('/loginViaGmail', userController.createSession);