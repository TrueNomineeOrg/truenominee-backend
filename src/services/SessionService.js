// SessionService.js

const sessionRepository = require('../repository/SessionRepository');
const { v4: uuidv4 } = require('uuid');

async function createSession(userId){
    const sessionData = {
        _id: uuidv4(),
        userId: userId,
        token: uuidv4(),
        status: "Active"
        };
    // Add expiry  
    resp = await sessionRepository.createSession(sessionData);
    return resp;
 };

 async function  authenticateSession(token){
    // Use redis cache for faster response
    const session = await sessionRepository.getSessionByToken(token);
    // Add session expiry checks
    if(session){
        return true;
    }
    return false;
}

async function  fetchAllSessions(userId){
    return await sessionRepository.getSessionByUserId(userId);
};

module.exports = {
    createSession,
    authenticateSession,
    fetchAllSessions
};