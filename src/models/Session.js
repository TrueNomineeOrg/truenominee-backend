// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    token: { type: String, required: true},
    status: { type: String, required: true },
    createdAt: { type: Number, required: false},
    updatedAt: { type: Number, required: false},
    // Add other fields as necessary
});

module.exports = mongoose.model('Session', sessionSchema, 'sessions');