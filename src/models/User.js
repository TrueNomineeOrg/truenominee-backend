// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: false},
    age: { type: Number, required: false},
    status: { type: String, required: true }
    // Add other fields as necessary
});

module.exports = mongoose.model('User', userSchema, "users");
