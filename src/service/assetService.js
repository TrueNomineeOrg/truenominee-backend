const Asset = require('../models/Asset'); // Adjust the path as necessary
const AssetRepository = require('../repository/AssetRepository');

const getAllAssets = async () => {
    try {
        const assets = await AssetRepository.getAll();
        return assets;
    } catch (error) {
        // Handle or log the error appropriately
        console.error("Failed to retrieve assets:", error);
        throw error;
    }
}

module.exports = { getAllAssets };