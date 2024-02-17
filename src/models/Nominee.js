// models/UserNominee.js
const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relation: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false }
    // Add other fields as necessary
});

module.exports = mongoose.model('Nominee', nomineeSchema, "nominees");
