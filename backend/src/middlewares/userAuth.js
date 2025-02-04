const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token Missing!!");
    }

    const decodeMsg = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = decodeMsg;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Invalid user!!");
    }

    next();
  } catch (err) {
    res.status(403).json({ Error: err.message });
  }
};

module.exports = userAuth;
