const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config");

const connectdb = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database Connection successfully.");
  } catch (error) {
    if (error.name === "MongooseServerSelectionError") {
      console.error("Please check your server is running or not");
    } else {
      console.log(error);
    }
    process.exit(1);
  }
};

module.exports = connectdb;
