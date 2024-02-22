const userController = require('./controllers/authController');

function validateSessionToken(req, res, next) {
    req.cookies={}
    // req.cookies.sessionToken = "xyz";
    // req.cookies.idToken = "abc";
    console.log("----TrueNominee----");
    console.log(req.originalUrl);
    // Validate session token
    if (!req.cookies.sessionToken && !req.cookies.idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const sessionToken = req.cookies.sessionToken; // Assuming session token is stored in a cookie
    const idToken = req.cookies.idToken;
    
    if(idToken){
        const userData = userController.verifyIdToken(idToken);
        if(userData){
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
    const sessionData = userController.fetchSession(sessionToken);   
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