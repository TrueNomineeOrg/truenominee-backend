const Alert = require('../models/Alert');

class AlertRepository {
    static async createAlert(alertData) {
        const alert = new Alert(alertData);
        await alert.save();
        return alert;
    }

    static async updateAlert(id, updateData) {
        try {
            const alert = await Alert.findByIdAndUpdate(id, updateData, { new: true });
            return alert;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    static async getById(id) {
        try {
            const entity = await Alert.findById(id, { __v: 0 });
            return entity;
        } catch (error) {
            throw error;
        }
    }

    static async getByUserIdAndStatus(userId, status) {
        try {
            const alerts = await Alert.find({userId: userId, status: status}, { __v: 0 });
            return alerts;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all entities of this type
    static async getAll() {
        try {
            const entities = await Alert.find({}, { __v: 0 });
            return entities;
        } catch (error) {
            throw error;
        }
    }

    // Add other generic methods as needed...
}

module.exports = AlertRepository;