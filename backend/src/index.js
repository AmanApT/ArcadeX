require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoute = require("./routes/authRoute");
const gameRoute = require("./routes/gameRoute");
const userRoute = require("./routes/userRoute");
const sellerRoute = require("./routes/sellerRoute");
const paymentRoute = require("./routes/paymentRoute");
const userAuth = require("./middlewares/userAuth");
const sellerAuth = require("./middlewares/sellerAuth");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000; 
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://arcadex-six.vercel.app" // ✅ Add your deployed frontend URL
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie", "X-Requested-With"],
  credentials: true, // ✅ Required for sending cookies
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/game", gameRoute);
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/payment", paymentRoute);

connectDB().then(() => {
  console.log(`Connected to DB succesfully!`);
  app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
  });
});
