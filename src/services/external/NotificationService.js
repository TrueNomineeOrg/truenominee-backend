const axios = require('axios');


const SEND_OTP_URL = 'https://api.springedge.com/v3/voice';
const VERIFY_OTP_URL = 'https://api.springedge.com/v3/voice/verify';
const API_KEY = 'YOUR_API_KEY';

async function callSendOtpAPI(params) {
    try {
        const response = await axios.post(SEND_OTP_URL, {
            apikey: API_KEY,
            method: 'otp',
            numbers: params.mobileNumber,
            sender: 'SEDEMO',
            otp: {
                length: 4,
                expiry: 5,
                retry: 2,
                voice: 'your_voice_code'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Error sending OTP' });
    }
}

async function callVerifyOtpAPI(params) {
    try {
        const response = await axios.post(VERIFY_OTP_URL, {
            apikey: API_KEY,
            method: 'otp',
            numbers: params.mobileNumber,
            otp: params.otp
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Error verifying OTP' });
    }
}

module.exports = {
    callSendOtpAPI,
    callVerifyOtpAPI
};