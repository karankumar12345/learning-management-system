const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.DB_URL;

if (!uri) {
  throw new Error("Database connection URL is missing in environment variable");
}

let retryCount = 0;
const maxRetries = 5;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    retryCount = 0; // Reset retry count on successful connection
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying MongoDB connection in 5 seconds... (Retry ${retryCount}/${maxRetries})`);
      setTimeout(connectDB, 5000);
    } else {
      console.error("Max MongoDB connection retries reached. Application will not attempt to reconnect.");
    }
  }
};

// Example graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection', err);
    process.exit(1);
  }
});

module.exports = {
  connectDB,
};