// authController.js
const authService = require('../services/AuthService');

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

const verifyIdToken = (req, res) => {

};


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
  const resp = await authService.loginViaGmail(req.userId, req.token);
  console.log("Create session!");
  console.log(resp);
  const responseData = {
    message: req.userId,
  };
  res.json(responseData);
}

module.exports = {
  sendOtp,
  verifyOtp,
  verifyIdToken,
  createSession,
  fetchSession
};
