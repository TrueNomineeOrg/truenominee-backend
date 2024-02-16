// models/Asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    logo: { type: String, required: false}
    // Add other fields as necessary
});

module.exports = mongoose.model('Asset', assetSchema);
