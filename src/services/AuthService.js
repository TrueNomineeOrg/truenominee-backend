const { OAuth2Client } = require('google-auth-library');
const sessionService = require('./SessionService');
const notificationService = require('./external/NotificationService');
const userRepository = require('../repository/UserRepository');
const { v4: uuidv4 } = require('uuid');


// Create a new OAuth2Client with your Google OAuth credentials
const CLIENT_ID = '744708588952-olg1t088v8gmfm511c8745nouffibqpl.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'; // This should match with your Google OAuth credentials
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


async function sendOtp(){
    // Create a user via userRepository using mobileNumber
    // Generate otp internally  and save in redis
    // Send message using third party
    notificationService.sendOtp();
    // Send a reference id - redis key
}


async function verifyOtp(){
    notificationService.verifyOtp();
    // Verify otp internally  via redis
    sessionService.createSession();
    // Return session token
}

async function createSession(userId){
    return sessionService.createSession(userId);
}

async function createOrFetchUser(emailId, userName){
    // Find if user exists
    const user = userRepository.getUserByEmailId(emailId);
    if(user){
        return user.userId;
    }
    else{
        const userData = {
            _id: uuidv4(),
            name: userName,
            email: emailId,
            status: "Active"
            };
        await userRepository.createUser(userData);
        return userData._id;
    }
}

async function fetchSession(sessionToken){
    return sessionService.fetchSession(sessionToken);
}

async function verifyIdToken(){
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
}

module.exports = { sendOtp, verifyOtp, verifyIdToken, createSession, fetchSession, createOrFetchUser};