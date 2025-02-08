const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  isShadowBan: {
    type: Boolean,
    default: false,
  },
  purchasedGames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game", // Reference to Game model
      default: [],
    },
  ],
  profileImage: {
    type: String,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      default: [],
    },
  ],
  cartlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      default: [],
    },
  ],
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      default: [],
    },
  ],
  membership: {
    type: String,
    enum: ["Amateur", "Advanced", "Elite"],
    default: "Amateur",
  },
});

module.exports = mongoose.model("User", userSchema);
