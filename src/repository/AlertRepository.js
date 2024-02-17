const Alert = require('../models/Alert');

class AlertRepository {
    async createAlert(alertData) {
        const alert = new Alert(alertData);
        await alert.save();
        return alert;
    }

    async updateAlert(id, updateData) {
        try {
            const alert = await Alert.findByIdAndUpdate(id, updateData, { new: true });
            return alert;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    async getById(id) {
        try {
            const entity = await Alert.findById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all entities of this type
    async getAll() {
        try {
            const entities = await Alert.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

    // Add other generic methods as needed...
}

module.exports = AlertRepository;