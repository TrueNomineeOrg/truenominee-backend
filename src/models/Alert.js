// models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true }, // unique id of the document
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user id
    type: { type: String, required: true }, // whatsapp / email / telegram / sms / ivr call / etc
    address: { type: String, required: true }, // address where the alert needs to be sent (can be mobile number or email id)
    lastActiveAt: { type: Date, required: true }, // when the user is last active - updated when signs in / acks the alert / 3rd party cookie tracking
    frequency: { type: Number, required: true }, // days post inactive when we need to send alert to user - in days
    nextAlertInfo: { type: Object, required: false }, // object containing when the next alert is expected to be sent, which channel, etc
    status: { type: String, required: true} // status of this alert for the user - active / inactive (goes to inactive when user changes the alert type / alert addres)
    // Add other fields as necessary
});

module.exports = mongoose.model('Alert', alertSchema);
