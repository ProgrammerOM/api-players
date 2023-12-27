const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://omagency:g0EKgRS5XhAjkHvG@om-agency.ljgithc.mongodb.net/Users?retryWrites=true&w=majority"
    );
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
