// authController.js
const authService = require('../services/AuthService');
const mocks = require('../utils/MockUtils');

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

const verifyIdToken = async (req, res) => {
  const resp = await authService.verifyIdToken(req.token);
  return resp;
};


const fetchSession = async (sessionToken) => {
  console.log("Validate session!");
  const resp = await authService.fetchSession(sessionToken);
  console.log(resp);

  // Mock data
  // console.log(mocks.sessionData);
  return resp;
};

const createSession = async (req, res) => {
  console.log("Create user!");
  const userData = await authService.createOrFetchUser();
  console.log(userData);
  console.log("Create session!");
  const resp = await authService.createSession(userData.userId);
  console.log(resp);
  res.json(resp);
}

module.exports = {
  sendOtp,
  verifyOtp,
  verifyIdToken,
  createSession,
  fetchSession
};
