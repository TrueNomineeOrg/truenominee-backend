const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('localhost:27017/truenominee', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add any other options here
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;
