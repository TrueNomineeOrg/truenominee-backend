// models/UserAsset.js
const mongoose = require('mongoose');

const userAssetSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    assetId: { type: String, ref: 'Asset', required: true },
    detail: { type: Object, required: false },
    // Add other fields as necessary
});

module.exports = mongoose.model('UserAsset', userAssetSchema, "user_asset_mapping");
