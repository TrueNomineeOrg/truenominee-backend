// models/UserAsset.js
const mongoose = require('mongoose');

const userAssetSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    detail: { type: Object, required: false },
    // Add other fields as necessary
});

module.exports = mongoose.model('UserAsset', userAssetSchema);
