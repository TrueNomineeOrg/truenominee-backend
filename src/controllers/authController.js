// authController.js
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


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


const authenticateSession = (req, res) => {
  
}

// Redirect to Google OAuth login page
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile'] // Define the scopes you need
  });
  res.redirect(authUrl);
});

module.exports = {
  loginViaGmail,
  sendOtp,
  verifyOtp,
  authenticateSession
};
