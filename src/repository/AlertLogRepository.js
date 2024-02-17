const AlertLog = require('../models/AlertLog');

class AlertLogRepository {
    // create

    async createAlertLog(alertLogData) {
        const alertLog = new AlertLog(alertLogData);
        await alertLog.save();
        return alertLog;
    }

    // update

    async updateAlertLog(id, updateData) {
        try {
            const alertLog = await AlertLog.findByIdAndUpdate(id, updateData, { new: true });
            return alertLog;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    async getById(id) {
        try {
            const entity = await AlertLog.findById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all entities of this type
    async getAll() {
        try {
            const entities = await AlertLog.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

    

    // get by user id

    // get 
}

module.exports = AlertLogRepository;