// SessionService.js

const sessionRepository = require('../repository/SessionRepository');
const idGeneratorService = require('./IdGeneratorService');


async function createSession(userId){
    const sessionData = {
        _id: idGeneratorService.generateSessionId(),
        userId: userId,
        token: idGeneratorService.generateSessionToken(),
        status: "Active"
        };
    // Add expiry  
    resp = await sessionRepository.createSession(sessionData);
    return resp;
 };

 async function fetchSession(token){
    return await sessionRepository.getSessionByToken(token);
 }

 // Unused
 async function authenticateSession(token){
    // Use redis cache for faster response
    const session = fetchSession(token);
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
    fetchSession,
    authenticateSession,
    fetchAllSessions
};