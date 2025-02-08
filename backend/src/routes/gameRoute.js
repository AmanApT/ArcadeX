const express = require("express");
const {
  addGame,
  deleteGame,
  approveGame,
  rejectGame,
  allGames,
} = require("../controllers/gameController");
const sellerAuth = require("../middlewares/sellerAuth");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/addGame", sellerAuth, addGame);
router.delete("/deleteGame", sellerAuth, deleteGame);
router.patch("/approveGame", sellerAuth, approveGame);
router.patch("/rejectGame", sellerAuth, rejectGame);

router.get("/allGames", adminAuth, allGames);

module.exports = router;
