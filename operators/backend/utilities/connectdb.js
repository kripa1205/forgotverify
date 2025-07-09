const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config");

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL);
    console.log("Database connection successfully.");
  } catch (error) {
    if (error.name === "MongooseServerSelectionError") {
      console.log("Please check server is running or not");
    } else {
      console.log("failed to connect database");
    }
    process.exit(1);
  }
};

module.exports = connectdb;
