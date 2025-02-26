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

const updateSeller = async (req, res) => {
  const { sellerId, name } = req.body;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      sellerId,
      { name },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json({ updatedName: updatedSeller.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllSeller = async (req, res) => {
  try {
    const sellers = await Seller.find({}).select("-password");

    res.json({ data: sellers });
  } catch (err) {
    console.error("Error getting all Sellers: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifySeller = async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedSeller = await Seller.findByIdAndUpdate(
      _id,
      { isVerified: true },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json({ message: "Seller Account Verified!" });
  } catch (err) {
    console.error("Error getting all Sellers: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getGames,
  getSellerProfile,
  deleteSellerProfile,
  updateSeller,
  getAllSeller,
  verifySeller,
};
