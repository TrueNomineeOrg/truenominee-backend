const Asset = require('../models/Asset'); // Replace EntityName with your actual model name

class AssetRepository {
    async createAsset(assetData) {
        const asset = new Asset(assetData);
        await asset.save();
        return asset;
    }

    async updateAsset(id, updateData) {
        try {
            const asset = await Asset.findByIdAndUpdate(id, updateData, { new: true });
            return asset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // Method to get entity by ID
    async getById(id) {
        try {
            const entity = await Asset.findById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all entities of this type
    async getAll() {
        try {
            const entities = await Asset.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

    // Add other generic methods as needed...
}