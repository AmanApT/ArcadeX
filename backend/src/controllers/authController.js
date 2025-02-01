const User = require("../models/user");
const mongoose = require("mongoose");

const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.send("User Created!");
  }
const userSignin = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.send("User Created!");
  }
module.exports = { userSignup, userSignin}