const userController = require('./controllers/authController');

async function validateSessionToken(req, res, next) {
    if (!req.headers.authorization && !req.cookies.idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const sessionToken = req.headers.authorization; // Assuming session token is stored in a cookie
    const idToken = req.cookies.idToken;
    if(idToken){
        const userData = await userController.verifyIdToken(idToken);
        if(userData){
            req.userName = userData.payload.name;
            req.emailId = userData.payload.email;
            req.userId = userData.userId;
            // If the idToken is valid, proceed to the next middleware or route handler
            next();
        }
        // Send a different error if Google Auth fails
        else{
            return res.status(401).json({ error: 'Unauthorized idToken' });
        }
    }
    else if(sessionToken){
    const sessionData = await userController.fetchSession(sessionToken);
        if(sessionData){
            req.userId = sessionData.userId;
            // If the session token is valid, proceed to the next middleware or route handler
            next();
        }
    }
    else{
        return res.status(401).json({ error: 'Unauthorized sessionToken' });
    }
}


module.exports = {
    validateSessionToken
};