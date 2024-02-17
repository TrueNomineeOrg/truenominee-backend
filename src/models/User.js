// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: false},
    mobile: { type: Number, required: false},
    email: { type: String, required: false},
    age: { type: Number, required: false},
    status: { type: String, required: true}
    // Add other fields as necessary
});

module.exports = mongoose.model('User', userSchema, "users");
