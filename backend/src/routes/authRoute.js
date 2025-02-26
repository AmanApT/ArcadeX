const express = require("express");
const {
  signup,
  signin,
  signout,
  refresh,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/refresh", refresh);
router.post("/verifyOtp", verifyOtp);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
