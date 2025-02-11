const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 250,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  banner_img: {
    type: String,
    required: true,
  },
  trailer_url: {
    type: String,
  },
  preview_img: {
    type: [String],
    required: true,
    validate: [arrayLimit, "Exceeds the limit of 5 for preview images"],
  },
  sys_req: {
    os: {
      type: [String],
      required: true,
    },
    gpu: {
      type: String,
      required: true,
    },
    memory: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
  },
  online: {
    type: Boolean,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  multiplayer: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  sold_copies: {
    type: Number,
    default: 0,
  },
  tier: {
    type: String,
    enum: ["Basic", "AA", "AAA"],
    required: true,
  },
  genre: {
    type: String,
    enum: ["Action", "Adventure", "Open-world", "Horror", "Simulation", "RPG"],
    required: true,
  },
  iarc: {
    type: String,
    enum: ["3", "7", "12", "18"],
    required: true,
  },
});

function arrayLimit(val) {
  return val.length <= 5;
}

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
