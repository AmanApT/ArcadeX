const express = require("express");
const {
  getUserProfile,
  deleteUserProfile,
  getGames,
  addToCart,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

router.get("/profile", userAuth, getUserProfile);
router.delete("/profile", userAuth, deleteUserProfile);

router.get("/games", userAuth, getGames);
router.patch("/addToCart", userAuth, addToCart);

module.exports = router;
