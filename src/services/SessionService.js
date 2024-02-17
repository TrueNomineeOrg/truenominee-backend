// SessionService.js

const sessionRepository = require('../repository/SessionRepository');

class SessionService {

    async createSession(userId){
        const sessionData = {
            userId: userId,
            token: "xyz",
            status: "Active"
          };
        // Add expiry  
        resp = await sessionRepository.createSession(sessionData);
        return resp.token;
    };

    async authenticateSession(token){
        // Use redis cache for faster response
        const session = await sessionRepository.getSessionByToken(token);
        // Add session expiry checks
        if(session){
            return true;
        }
        return false;
    }

    async fetchAllSessions(userId){
        return await sessionRepository.getSessionByUserId(userId);
    };

}

module.exports = SessionService;