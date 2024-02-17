const Asset = require('../models/Asset'); // Adjust the path as necessary
const AssetRepository = require('../repository/AssetRepository');
const AssetClass = require('../models/constants/AssetClass')

const getAllAssets = async () => {
    try {
        const assets = await AssetRepository.getAll();

        return convertAssetsToMap(assets);
    } catch (error) {
        // Handle or log the error appropriately
        console.error("Failed to retrieve assets:", error);
        throw error;
    }
}

function convertAssetsToMap(assets) {
    const assetMap = {};
    // Initialize map with all asset classes having an empty array
    Object.keys(AssetClass).forEach(assetClass => {
        assetMap[assetClass] = { "name": AssetClass[assetClass].name, "type" : AssetClass[assetClass].type, assets: []};
    });

    // Populate the map with asset names
    assets.forEach(asset => {
        if (assetMap.hasOwnProperty(asset.class)) {
            assetMap[asset.class].assets.push(asset);
        }
    });

    return assetMap;
}

module.exports = { getAllAssets };