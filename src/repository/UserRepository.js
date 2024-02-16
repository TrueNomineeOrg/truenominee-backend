const User = require('../models/User');

class UserRepository {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async updateUser(userId, updateData) {
        try {
            // Find the user by ID and update it
            const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
            return user;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    async getAll() {
        try {
            const entities = await User.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

    // Other user-related database operations
}
