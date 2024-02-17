const redis = require('redis');

// Initialize Redis client
const redisClient = redis.createClient();


// Function to store OTP in Redis
const storeOTPInRedis = async (mobileNumber, otp) => {
    if (!isValidMobileNumber(mobileNumber)) {
      throw new Error('Invalid mobile number');
    }
    return new Promise((resolve, reject) => {
      redisClient.set(mobileNumber, otp, 'EX', 300, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  // Function to retrieve OTP from Redis
  const getOTPFromRedis = async (mobileNumber) => {
    if (!isValidMobileNumber(mobileNumber)) {
      throw new Error('Invalid mobile number');
    }
    return new Promise((resolve, reject) => {
      redisClient.get(mobileNumber, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };


  module.exports = {
  storeOTPInRedis,
  getOTPFromRedis
};