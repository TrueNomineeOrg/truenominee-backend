const Asset = require('../models/Asset'); // Adjust the path as necessary
const AssetRepository = require('../repository/AssetRepository');
const UserAssetRepository = require('../repository/UserAssetRepository');
const AssetClass = require('../models/constants/AssetClass');
const UserAsset = require('../models/UserAsset');
const { v4: uuidv4 } = require('uuid');

async function getAllAssets() {
    try {
        const assets = await AssetRepository.getAll();
        return convertAssetsToMap(assets);
    } catch (error) {
        // Handle or log the error appropriately
        console.error("Failed to retrieve assets:", error);
        throw error;
    }
}

async function addAssets(userId, assets) {
    // Bulk insert or individual inserts based on your preference
    const newAssets = assets.map(asset => ({ _id: uuidv4(), assetId: asset.assetId, userId: userId, detail: asset.detail }));
    // todo: move below to repo layer
    return UserAssetRepository.addAssets(newAssets);
}

async function updateAssets(assets) {
    // Update each asset. Consider transaction if atomicity is required
    console.log(assets);
    return Promise.all(assets.map(asset =>
        UserAssetRepository.updateAssetDetailById(asset._id, asset.detail)
        .catch(error => {
            console.error(`Failed to update asset with _id: ${asset._id}`, error);
            return null; // Return null or a meaningful error object
          })
    ));
}

async function deleteAssets(ids) {
    // Bulk delete
    // todo: move below call to repo layer
    return UserAssetRepository.deleteAssets(ids);
}

async function getAssetsByUserId(userId) {
    try {
        const assets = await UserAssetRepository.getUserAssetByUserId(userId);
        return assets;
      } catch (error) {
        throw error;
      }
}

function convertAssetsToMap(assets) {
    const assetMap = {};
    // Initialize map with all asset classes having an empty array
    Object.keys(AssetClass).forEach(assetClass => {
        assetMap[assetClass] = { "name": AssetClass[assetClass].name, "type": AssetClass[assetClass].type, assets: [] };
    });

    // Populate the map with asset names
    assets.forEach(asset => {
        if (assetMap.hasOwnProperty(asset.class)) {
            assetMap[asset.class].assets.push(asset);
        }
    });

    return assetMap;
}

module.exports = { getAllAssets, addAssets, updateAssets, deleteAssets, getAssetsByUserId };