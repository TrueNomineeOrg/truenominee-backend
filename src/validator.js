const userController = require('./controllers/authController');


function validateSessionToken(req, res, next) {
    req.cookies={}
    req.cookies.sessionToken = "xyz";
    req.cookies.idToken = "abc";
    const sessionToken = req.cookies.sessionToken; // Assuming session token is stored in a cookie
    const idToken = req.cookies.idToken;
    
    // Validate session token
    if (!sessionToken && !) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const sessionData = userController.fetchSession(sessionToken);
    console.log("Hello, Validator");    
    console.log(sessionData);    
    if(sessionData){
        req.userId = sessionData.userId;
        // If the session token is valid, proceed to the next middleware or route handler
        next();
    }
    else{
        return res.status(401).json({ error: 'Unauthorized' });
    }
}


module.exports = {
    validateSessionToken
};