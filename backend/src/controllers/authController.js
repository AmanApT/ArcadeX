const User = require("../models/user");
const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authValidator = require("../utils/validation");

const signup = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (!authValidator(email, password, name)) {
      throw new Error("Invalid credentials in Signup");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let token;

    if (type === "User") {
      const user = new User({
        name,
        email,
        password: hashPassword,
      });

      await user.save();

      token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
    } else {
      const seller = new Seller({
        name,
        email,
        password: hashPassword,
      });

      await seller.save();

      token = jwt.sign({ _id: seller._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.send("Account Created!");
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    let token;

    if (!authValidator(email, password)) {
      throw new Error("Invalid credentials in Signin");
    }

    if (type === "User") {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Cannot find user!!");
      }

      const isValidPwd = await bcrypt.compare(password, user.password);

      if (!isValidPwd) {
        throw new Error("Invalid Password");
      }

      token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
    } else {
      const seller = await Seller.findOne({ email });

      if (!seller) {
        throw new Error("Cannot find seller!!");
      }

      const isValidPwd = await bcrypt.compare(password, seller.password);

      if (!isValidPwd) {
        throw new Error("Invalid Password");
      }

      token = jwt.sign({ _id: seller._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send("Successfully Logged In!");
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Signout successful!" });
  } catch (err) {
    res.status(500).json({ error: "Signout failed!" });
  }
};

module.exports = { signup, signin, signout };
