const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  contact: {
    type: String,
    minLength: 10,
    maxLength: 12,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      default: [],
    },
  ],
  profileImage: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
