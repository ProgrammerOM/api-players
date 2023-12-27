const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  title: String,
  numbers: {
    type: Number,
  },
});
const Random = mongoose.model("random", userSchema);
module.exports = Random;
