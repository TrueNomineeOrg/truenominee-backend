// models/Alert.js
const mongoose = require('mongoose');

const alertLogSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // unique id of the document
    alertId: { type: String, ref: 'Alert', required: true }, // alert id
    userId: { type: String, required: true},
    initiatedAt: { type: Date, required: true},
    deliveryStatus: { type: String, required: true },
    deliveredAt: { type: Date, required: true},
    readStatus: { type: String, required: true },
    readAt: { type: Date, required: true},
    ackStatus: { type: String, required: true },
    ackAt: { type: Date, required: true }
    // Add other fields as necessary
});

module.exports = mongoose.model('AlertLog', alertLogSchema, "alert_logs");
