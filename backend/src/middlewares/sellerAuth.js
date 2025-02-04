const Seller = require("../models/seller");
const jwt = require("jsonwebtoken");

const sellerAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token Missing!!");
    }

    const decodeMsg = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = decodeMsg;

    const seller = await Seller.findById(_id);

    if (!seller) {
      throw new Error("Invalid seller!!");
    }

    next();
  } catch (err) {
    res.status(403).json({ Error: err.message });
  }
};

module.exports = sellerAuth;
