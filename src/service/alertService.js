const Alert = require('../models/Alert');
const AlertRepository = require('../repository/AlertRepository')
const { v4: uuidv4 } = require('uuid');

async function createAlert(data) {
    // First, fetch all existing alerts of the same type for the user that are active
    const previousAlerts = await AlertRepository.getByUserIdAndStatus(data.userId, 'ACTIVE');

    // Mark each of the fetched alerts as inactive
    await Promise.all(previousAlerts.map(previousAlert =>
        AlertRepository.updateAlert(previousAlert._id, { status: 'INACTIVE' })
    ));

    return AlertRepository.createAlert({
        _id: uuidv4(),
        userId: data.userId,
        frequency: data.frequency,
        type: data.type,
        lastActiveAt: Date.now(),
        address: data.address,
        status: 'ACTIVE' // Ensure the new alert is active
    });
};

async function updateAlert(id, data) {
    return AlertRepository.updateAlert(id, {frequency: data.frequency, type: data.type, address: data.address, lastActiveAt: Date.now()});

};

async function deleteAlert(id) {
    return AlertRepository.updateAlert(id, { status: 'INACTIVE' });
};

async function getAlertsByUserId(id) {
    return AlertRepository.getAll();
}

module.exports = {
    createAlert,
    updateAlert,
    deleteAlert,
    getAlertsByUserId
};
