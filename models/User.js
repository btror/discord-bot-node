const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  author: {
    type: Number,
    required: true,
  },
  wallet: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;