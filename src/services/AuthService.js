const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const sessionService = require('SessionService');
const notificationService = require('NotificationService');

class AuthService {
    async sendOtp(){
        // Create a user via userRepository using mobileNumber
        // Generate otp internally  and save in redis
        // Send message using third party
        notificationService.sendOtp();
        // Send a reference id - redis key
    }


    async verifyOtp(){
        notificationService.verifyOtp();
        // Verify otp internally  via redis
        sessionService.createSession();
        // Return session token
    }

    async loginViaGmail(){
        // Use IdToken to verify with google
        // Create a user via userRepository using mobileNumber
        // Create a new session
        sessionService.createSession();
        // Return session token
    }

}
// Create a new OAuth2Client with your Google OAuth credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'; // This should match with your Google OAuth credentials
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

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

module.exports = AuthService;