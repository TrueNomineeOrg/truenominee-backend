// authController.js
// const { OAuth2Client } = require('google-auth-library');
// const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Redirect to Google OAuth login page
// app.get('/auth/google', (req, res) => {
//   const authUrl = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: ['email', 'profile'] // Define the scopes you need
//   });
//   res.redirect(authUrl);
// });

const authService = require('../services/AuthService');

const loginViaGmail = (req, res) => {
  // Your login logic here
};

// Function to validate mobile number
const isValidMobileNumber = (mobileNumber) => {
  return /^\d{10}$/.test(mobileNumber);
};

const sendOtp = (req, res) => {
  if (!isValidMobileNumber(req.mobileNumber)) {
    throw new Error('Invalid mobile number');
  }
}

const verifyOtp = (req, res) => {
  
}


const fetchSession = (sessionToken) => {
  console.log("Validate session!");
  const sessionData = {
    message: 'Session created - Token:XYZ',
    userId: 'testUser'
  };
  console.log(sessionData);
  return sessionData;
};

const createSession = async (req, res) => {
  const resp = await authService.loginViaGmail(req.userId);
  console.log("Create session!");
  console.log(resp);
  const responseData = {
    message: req.userId,
  };
  res.json(responseData);
}

module.exports = {
  loginViaGmail,
  sendOtp,
  verifyOtp,
  createSession,
  fetchSession
};
