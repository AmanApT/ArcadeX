require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoute = require("./routes/authRoute");
const gameRoute = require("./routes/gameRoute");
const userAuth = require("./middlewares/userAuth");
const sellerAuth = require("./middlewares/sellerAuth");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/game", gameRoute);

//Just for testing purpose
app.get("/api/test", userAuth, (req, res) => {
  res.send("Radhe radhe");
});
app.get("/api/seller", sellerAuth, (req, res) => {
  res.send("Eeeeeeeeeeee seller wala h, hihihihi");
});

connectDB().then(() => {
  console.log(`Connected to DB succesfully!`);
  app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
  });
});
