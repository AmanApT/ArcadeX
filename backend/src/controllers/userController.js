const User = require("../models/user");
const Game = require("../models/game");

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");

    res.json({ data: user });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    await User.findByIdAndDelete(userId);

    res.json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//Get all those games which are verified
const getGames = async (req, res) => {
  try {
    const games = await Game.find({ status: "approved" });

    res.json({ data: games });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { gameId } = req.body;
    const { userId } = req;

    const game = await Game.findById(gameId);

    if (!game) {
      throw new Error("Cannot find game!!");
    }

    const user = await User.findById(userId);

    const existing = user.cartlist.find((id) => id.toString() === gameId);

    if (existing) {
      return res.json({ message: "Already exist in cart!!" });
    }

    user.cartlist.push(gameId);

    await user.save();

    res.json({ message: "Added to cart!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

module.exports = { getUserProfile, deleteUserProfile, getGames, addToCart };
