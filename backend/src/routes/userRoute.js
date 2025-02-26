const express = require("express");
const {
  getUserProfile,
  deleteUserProfile,
  getGames,
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
  paymentSuccess,
  getAllUser,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.get("/profile", userAuth, getUserProfile);
router.delete("/profile", userAuth, deleteUserProfile);

router.get("/games", userAuth, getGames);
router.patch("/addToCart", userAuth, addToCart);
router.patch("/addToWishlist", userAuth, addToWishlist);
router.delete("/removeCartGame/:gameId", userAuth, removeFromCart);
router.delete("/removeWishlistGame/:gameId", userAuth, removeFromWishlist);

router.post("/paymentSuccess", userAuth, paymentSuccess);
router.get("/getAllUser", adminAuth, getAllUser);

module.exports = router;
