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
    let data;

    if (type != "Admin" && !authValidator(email, password)) {
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

      data = user.toObject();
      delete data.password;
    } else if (type === "Seller") {
      const seller = await Seller.findOne({ email });

      if (!seller) {
        throw new Error("Cannot find seller!!");
      }

      data = seller;

      const isValidPwd = await bcrypt.compare(password, seller.password);

      if (!isValidPwd) {
        throw new Error("Invalid Password");
      }

      token = jwt.sign({ _id: seller._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      data = seller.toObject();
      delete data.password;
    } else {
      if (password === process.env.ADMIN_SECRET_KEY) {
        token = jwt.sign(
          { _id: process.env.ADMIN_SECRET_KEY },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
      }
    }

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({ data: data });
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

const refresh = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { type } = req.body;
    // console.log(req.body);
    // console.log(req.cookies);

    let data;

    if (!token) {
      throw new Error("Token Missing!!");
    }

    const decodeMsg = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = decodeMsg;

    if (type == "User") {
      data = await User.findById(_id);

      if (!data) {
        throw new Error("Invalid user!!");
      }
    } else if (type == "Seller") {
      data = await Seller.findById(_id);

      if (!data) {
        throw new Error("Invalid seller!!");
      }
    }
    // console.log(data);

    data = data.toObject();
    delete data.password;
    res.json({ data: data });
  } catch (err) {
    res.status(403).json({ Error: err.message });
  }
};

module.exports = { signup, signin, signout, refresh };
