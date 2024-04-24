const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Number,
});

module.exports = mongoose.model("userSchema", userSchema);
