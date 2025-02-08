require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoute = require("./routes/authRoute");
const gameRoute = require("./routes/gameRoute");
const userRoute = require("./routes/userRoute");
const sellerRoute = require("./routes/sellerRoute");
const userAuth = require("./middlewares/userAuth");
const sellerAuth = require("./middlewares/sellerAuth");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/game", gameRoute);
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);

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
