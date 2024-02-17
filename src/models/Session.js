// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: false},
    status: { type: String, required: true },
    createdAt: { type: Number, required: false},
    updatedAt: { type: Number, required: false},
    // Add other fields as necessary
});

module.exports = mongoose.model('Session', sessionSchema);