const express = require("express");
const {
  getGames,
  getSellerProfile,
  deleteSellerProfile,
  updateSeller,
  getAllSeller,
  verifySeller,
} = require("../controllers/sellerController");
const sellerAuth = require("../middlewares/sellerAuth");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.get("/games", sellerAuth, getGames);
router.get("/profile", sellerAuth, getSellerProfile);
router.delete("/profile", sellerAuth, deleteSellerProfile);
router.patch("/updateSeller", sellerAuth, updateSeller);

router.get("/getAllSeller", adminAuth, getAllSeller);
router.patch("/verifySeller", adminAuth, verifySeller);

module.exports = router;
