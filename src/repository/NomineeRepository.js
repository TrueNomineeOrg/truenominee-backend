const Nominee = require('../models/Nominee'); // Replace EntityName with your actual model name

class NomineeRepository {
    async createNominee(nomineeData) {
        const nominee = new Nominee(nomineeData);
        await nominee.save();
        return nominee;
    }

    static async addNominees(newNominees) {
        return await Nominee.insertMany(newNominees);
    }

    static async updateNominee(id, updateData) {
        try {
            const nominee = await Nominee.findByIdAndUpdate(id, updateData, { new: true });
            return nominee;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    async getById(id) {
        try {
            const entity = await Nominee.findById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    static async getNomineesByUserId(userId) {
        try {
            const nominees = await Nominee.find({ userId: userId }, { __v: 0 });
            return nominees;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get all entities of this type
    async getAll() {
        try {
            const entities = await Nominee.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

    static async deleteNominees(ids) {
        try {
            return await Nominee.deleteMany({ _id: { $in: ids } });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NomineeRepository;