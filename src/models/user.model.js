const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
    enum: [true, false],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
