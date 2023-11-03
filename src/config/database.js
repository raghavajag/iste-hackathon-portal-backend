const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      process.env.DB_CONNETION,
    );
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
};

module.exports = connectDB;