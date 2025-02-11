const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token Missing!!");
    }

    const decodeMsg = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = decodeMsg;

    if (!_id) {
      throw new Error("Invalid Key!!");
    }

    // if (_id !== process.env.ADMIN_SECRET_KEY) {
    //   throw new Error("Wrong Key!!");
    // }

    next();
  } catch (err) {
    res.status(403).json({ Error: err.message });
  }
};

module.exports = adminAuth;
