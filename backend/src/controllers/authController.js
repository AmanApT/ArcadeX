const User = require("../models/user");
const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authValidator = require("../utils/validation");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailForgot = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

const signup = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (!authValidator(email, password, name)) {
      throw new Error("Invalid credentials in Signup");
    }

    if (type === "User") {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already exists" });
    } else if (type === "Seller") {
      const existingSeller = await Seller.findOne({ email });
      if (existingSeller)
        return res.status(400).json({ message: "Email already exists" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      specialChars: false,
    });

    const hashPassword = await bcrypt.hash(password, 10);

    let token;

    if (type === "User") {
      const user = new User({
        name,
        email,
        password: hashPassword,
        otp,
        otpExpires: new Date(Date.now() + 5 * 60 * 1000),
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
        otp,
        otpExpires: new Date(Date.now() + 5 * 60 * 1000),
      });

      await seller.save();

      token = jwt.sign({ _id: seller._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "AracdeX- OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({ message: "OTP sent. Please verify.", email });
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
      data = "Authenticated";
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
    } else {
      data = "Authorized";
    }
    // console.log(data);

    if (type !== "Admin") {
      data = data.toObject();
      delete data.password;
    }
    res.json({ data: data });
  } catch (err) {
    res.status(403).json({ Error: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    console.log(type);

    if (type === "User") {
      const user = await User.findOne({ email });

      if (!user) return res.status(410).json({ message: "OTP has expired" });

      if (!user.otp || !user.otpExpires) {
        return res.status(410).json({ message: "OTP has expired" });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      await User.updateOne({ email }, { $unset: { otp: "", otpExpires: "" } });

      // console.log(user);

      //⚠️⚠️ Doubt, when doing updateOne -> then do we need to perform .save() ??
      // await user.save();
    } else if (type === "Seller") {
      const seller = await Seller.findOne({ email });

      if (!seller) return res.status(410).json({ message: "OTP has expired" });

      if (!seller.otp || !seller.otpExpires) {
        return res.status(410).json({ message: "OTP has expired" });
      }

      if (seller.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      await Seller.updateOne(
        { email },
        { $unset: { otp: "", otpExpires: "" } }
      );

      await seller.save();
    }

    res.json({ message: "Account verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  let user =
    (await User.findOne({ email })) || (await Seller.findOne({ email }));

  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  
  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: token,
    resetPasswordExpires: Date.now() + 3600000,
  });

  const resetUrl = `http://localhost:5173/resetPassword/${token}`;
  const message = `Click the following link to reset your password: ${resetUrl}`;

  await sendEmailForgot(user.email, "Password Reset Request", message);
  res.json({ message: "Reset link sent to email" });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  let user =
    (await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })) ||
    (await Seller.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }));

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};

module.exports = {
  signup,
  signin,
  signout,
  refresh,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
