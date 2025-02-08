const express = require("express");
const {
  getGames,
  getSellerProfile,
  deleteSellerProfile,
} = require("../controllers/sellerController");
const sellerAuth = require("../middlewares/sellerAuth");

const router = express.Router();

router.get("/games", sellerAuth, getGames);
router.get("/profile", sellerAuth, getSellerProfile);
router.delete("/profile", sellerAuth, deleteSellerProfile);

module.exports = router;
