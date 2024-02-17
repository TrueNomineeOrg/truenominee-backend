const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

// Endpoint to send OTP to the provided mobile number
app.post('/sendOTP', async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const response = await axios.post('https://api.springedge.com/v3/voice', {
            apikey: 'YOUR_API_KEY',
            method: 'otp',
            numbers: mobileNumber,
            sender: 'SEDEMO',
            otp: {
                length: 6,
                expiry: 5,
                retry: 1,
                voice: 'your_voice_code'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Error sending OTP' });
    }
});

// Endpoint to verify OTP
app.post('/verifyOTP', async (req, res) => {
    const { mobileNumber, otp } = req.body;

    try {
        const response = await axios.post('https://api.springedge.com/v3/voice/verify', {
            apikey: 'YOUR_API_KEY',
            method: 'otp',
            numbers: mobileNumber,
            otp: otp
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Error verifying OTP' });
    }
});

// Create a new OAuth2Client with your Google OAuth credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'; // This should match with your Google OAuth credentials
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


// Redirect to Google OAuth login page
app.get('/auth/google', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['email', 'profile'] // Define the scopes you need
    });
    res.redirect(authUrl);
});

// Callback route after user grants permissions
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        // Now you can use the tokens to get user information or perform actions on behalf of the user
        oauth2Client.setCredentials(tokens);
        const userInfo = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID
        });
        console.log(userInfo.payload);
        res.send('Successfully authenticated with Google!');
    } catch (error) {
        console.error('Error authenticating with Google:', error);
        res.status(500).send('Error authenticating with Google');
    }
});




// User collection
let users = [];

// Session collection
let sessions = [];

// Function to validate mobile number
const isValidMobileNumber = (mobileNumber) => {
  return /^\d{10}$/.test(mobileNumber);
};

// Getter function to retrieve user by mobile number
const getUserByMobileNumber = async (mobileNumber) => {
  if (!isValidMobileNumber(mobileNumber)) {
    throw new Error('Invalid mobile number');
  }
  return users.find(user => user.mobileNumber === mobileNumber);
};

// Setter function to add a new user
const addUser = async (newUser) => {
  if (!isValidMobileNumber(newUser.mobileNumber)) {
    throw new Error('Invalid mobile number');
  }
  users.push(newUser);
};

// Getter function to retrieve session by user ID
const getSessionByUserId = async (userId) => {
  return sessions.find(session => session.userId === userId);
};

// Setter function to add a new session
const addSession = async (newSession) => {
  sessions.push(newSession);
};


module.exports = {
getUserByMobileNumber,
addUser,
getSessionByUserId,
addSession
};