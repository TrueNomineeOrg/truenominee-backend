const UserAsset = require('../models/UserAsset');

class UserAssetRepository {

    // create

    static async createUserAsset(userAssetData) {
        const userAsset = new UserAsset(userAssetData);
        await userAsset.save();
        return userAsset;
    }

    static async addAssets(newAssets) {
        return await UserAsset.insertMany(newAssets);
    }

    // update

    static async updateUserAsset(id, updateData) {
        try {
            const userAsset = await UserAsset.findByIdAndUpdate(id, updateData, { new: true });
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    static async updateAssetDetailById(id, detail) {
        try {
            const a = await UserAsset.findByIdAndUpdate(id, { $set: {detail: detail} }, { new: true });
            return a;
        } catch (error) {
            throw error;
        }
    }

    // get

    static async getUserAssetById(id) {
        try {
            const userAsset = await UserAsset.findById(id);
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    static async getUserAssetByUserId(userId) {
        try {
            const userAsset = await UserAsset.find({ userId: userId }, { __v: 0 });
            return userAsset;
        } catch (error) {
            // Handle or throw the error
            throw error;
        }
    }

    static async getAll() {
        try {
            const entities = await UserAsset.find({});
            return entities;
        } catch (error) {
            throw error;
        }
    }

    static async deleteAssets(ids) {
        try {
            return await UserAsset.deleteMany({ _id: { $in: ids } });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserAssetRepository;