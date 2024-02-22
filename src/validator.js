const userController = require('./controllers/authController');

async function validateSessionToken(req, res, next) {
    // req.cookies={}
    // req.cookies.sessionToken = "16b74ebbb5494b1dbe9fbdbd1b0a30b0";
    // req.cookies.idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1YzE4OGE4MzU0NmZjMTg4ZTUxNTc2YmE3MjgzNmUwNjAwZThiNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1ODYwNjI2MzY5MTMtc3VnaGhtaHM3a2FnZjB1Mjc5NjU4dWg0MG03bDRtYmQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1ODYwNjI2MzY5MTMtc3VnaGhtaHM3a2FnZjB1Mjc5NjU4dWg0MG03bDRtYmQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc0OTExMjU4NjU5OTA2OTc0MTEiLCJlbWFpbCI6InNhbmplZXYxMTM5OEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InBhZDUybXRRbXRBeXFwNE1SRFd5UlEiLCJuYW1lIjoiU2FuamVldiBKYXlhU3VyeWEgUyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLZEYxWGxtalFDVXB1ZG44YW1ZTC1JcDBWSktRLVNfTjBhc29sZU5NUHo9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2FuamVldiIsImZhbWlseV9uYW1lIjoiSmF5YVN1cnlhIFMiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTcwODYyMzMzMSwiZXhwIjoxNzA4NjI2OTMxfQ.OubJ_eGI0pS-60RsSFr5uPDKAEZ3HiOTSaT8EnMzb-OfMkIZPT0iW73VsOVuGWgSo3-jRF6p1Rr9f8KThTyGYWJJqwPy3Cfg3OKV-IkxUq_tQfukMNqEchsVjCYxbhEbLUiuJPkWCaF7IPVX5qbTvTrvZOQQ3705--TFKBz6roTuyrK0SBf200XEhf30ljeHR4TkUkuMnKi2xxSQ6CP5vgKV2OErU7rZVjKaX2ObJ01zKzBS6candIN93qzKHH_V4GIA4kRJlTGC9d8aI113gW-Ihv-P04qiO0tjo3lfKyVdglrSGyW6Hf012xhZFsSFRqhUW1-HGXlnRwrELAQw3A";
    console.log("----TrueNominee----");
    console.log(req.originalUrl);
    // Validate session token
    if (!req.cookies.sessionToken && !req.cookies.idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const sessionToken = req.cookies.sessionToken; // Assuming session token is stored in a cookie
    const idToken = req.cookies.idToken;
    if(idToken){
        const userData = await userController.verifyIdToken(idToken);
        if(userData){
            req.userName = userData.payload.name;
            req.emailId = userData.payload.email;
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
            console.log("call next");
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