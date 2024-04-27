// authController.js
const authService = require('../services/AuthService');
// import { mocks } from '../utils/MockUtils';

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

const verifyIdToken = (idToken) => {
  return authService.verifyIdToken(idToken);
};


const fetchSession = async (sessionToken) => {
  const resp = await authService.fetchSession(sessionToken);
  return resp;
};


const authenticateSession = async (req, res) => {
  res.json(req.userId);
}

const createSession = async (req, res) => {
  console.log("Create user");
  const userData = await authService.createOrFetchUser(req.emailId, req.userName);
  console.log("Create session!");
  const resp = await authService.createSession(userData._id);
  res.json(resp);
}

module.exports = {
  sendOtp,
  verifyOtp,
  verifyIdToken,
  createSession,
  fetchSession,
  authenticateSession
};
