const express = require("express");
const {
  signup,
  signin,
  signout,
  refresh,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/refresh", refresh);

module.exports = router;
