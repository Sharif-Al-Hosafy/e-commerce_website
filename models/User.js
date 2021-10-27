const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
  img: {},
  orders: {},
  wishlist: {},
});

module.exports = mongoose.model("User", userSchema);