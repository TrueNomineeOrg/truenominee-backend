const Session = require('../models/Session'); // Replace EntityName with your actual model name

class SessionRepository {
    async createSession(sessionData) {
        const session = new Session(sessionData);
        await session.save();
        return session;
    }

    async updateSession(id, updateData) {
        try {
            const session = await Session.findByIdAndUpdate(id, updateData, { new: true });
            return session;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    async getById(id) {
        try {
            const entity = await Session.findById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all entities of this type
    async getAll() {
        try {
            const entities = await Session.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

}