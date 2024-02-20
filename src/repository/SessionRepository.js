const Session = require('../models/Session'); // Replace EntityName with your actual model name

class SessionRepository {

    static async createSession(sessionData) {
        const session = new Session(sessionData);
        await session.save();
        return session;
    }

    static async updateSession(id, updateData) {
        try {
            const session = await Session.findByIdAndUpdate(id, updateData, { new: true });
            return session;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    static async getById(id) {
        try {
            const entity = await Session.findById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    // Getter function to retrieve session by user ID
    static async getSessionByUserId(userId) {
        return sessions.find(session => session.userId === userId);
    }

    // Getter function to retrieve session by session token
    static async getSessionByToken(token) {
        return sessions.find(session => session.token === token);
    }

}

module.exports = SessionRepository;