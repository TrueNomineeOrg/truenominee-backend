const UserAsset = require('../models/UserAsset');

class UserAssetRepository {

    // create

    async createUserAsset(userAssetData) {
        const userAsset = new UserAsset(userAssetData);
        await userAsset.save();
        return userAsset;
    }

    // update

    async updateUserAsset(id, updateData) {
        try {
            const userAsset = await UserAsset.findByIdAndUpdate(id, updateData, { new: true });
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    async updateUserAssetByUserIdAssetId(userId, assetId, updateData) {
        try {
            const userAsset = await UserAsset.updateMany({ userId: userId, assetId: assetId }, updateData, { new: true });
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    // get

    async getUserAssetById(id) {
        try {
            const userAsset = await UserAsset.findById(id);
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    async getUserAssetByUserId(userId) {
        try {
            const userAsset = await UserAsset.find({ userId: userId });
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    async getAll() {
        try {
            const entities = await UserAsset.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }
}
