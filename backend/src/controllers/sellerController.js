const Seller = require("../models/seller");

const getGames = async (req, res) => {
  try {
    const { sellerId } = req;
    const games = await Seller.findById(sellerId).select("games");

    res.json({ data: games });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const getSellerProfile = async (req, res) => {
  try {
    const { sellerId } = req;

    const seller = await Seller.findById(sellerId).select("-password");

    res.json({ data: seller });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const deleteSellerProfile = async (req, res) => {
  try {
    const { sellerId } = req;
    await Seller.findByIdAndDelete(sellerId);

    res.json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

module.exports = { getGames, getSellerProfile, deleteSellerProfile };
