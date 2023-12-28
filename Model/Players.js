const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  title: String,
  numbers: {
    type: Number,
  },
});
const Players = mongoose.model("Players", userSchema);
module.exports = Players;
