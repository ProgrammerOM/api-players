const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeSchema = new Schema({
  title: {
    type: String,
  },
  times: {
    type: String,
  },
});
const Time = mongoose.model("times", TimeSchema);
module.exports = Time;
