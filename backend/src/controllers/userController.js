const User = require("../models/user");
const Game = require("../models/game");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");

    res.json({ data: user });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    await User.findByIdAndDelete(userId);

    res.json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

//Get all those games which are verified
const getGames = async (req, res) => {
  try {
    const games = await Game.find({ status: "approved" });

    res.json({ data: games });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { gameId } = req.body;
    const { userId } = req;

    const game = await Game.findById(gameId);
    console.log(gameId);

    if (!game) {
      throw new Error("Cannot find game!!");
    }

    const user = await User.findById(userId);

    const existing = user.cartlist.find((id) => id.toString() === gameId);

    if (existing) {
      return res.json({ message: "Already exist in cart!!" });
    }

    user.cartlist.push(gameId);

    await user.save();

    res.json({ message: "Added to cart!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { gameId } = req.body;
    const { userId } = req;

    const game = await Game.findById(gameId);

    if (!game) {
      throw new Error("Cannot find game!!");
    }

    const user = await User.findById(userId);

    const existing = user.wishlist.find((id) => id.toString() === gameId);

    if (existing) {
      return res.json({ message: "Already exist in wishlist!!" });
    }

    user.wishlist.push(gameId);

    await user.save();

    res.json({ message: "Added to wishlist!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { userId } = req;

    const game = await Game.findById(gameId);

    if (!game) {
      throw new Error("Cannot find game!!");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { cartlist: gameId } });

    res.json({ message: "Removed from cart!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { userId } = req;

    const game = await Game.findById(gameId);

    if (!game) {
      throw new Error("Cannot find game!!");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { wishlist: gameId } });

    res.json({ message: "Removed from wishlist!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const { userId, sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Missing session ID" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    const purchasedGameIds = session.line_items.data.map(
      (item) => item.price.product.metadata.gameId
    );

    if (!purchasedGameIds.length) {
      return res.status(400).json({ message: "No games found in session" });
    }

    const purchasedGamesDetails = await Game.find({
      _id: { $in: purchasedGameIds },
    });

    const updateGamesPromises = purchasedGameIds.map((gameId) =>
      Game.findByIdAndUpdate(
        gameId,
        { $inc: { sold_copies: 1 } },
        { new: true }
      )
    );

    await Promise.all(updateGamesPromises);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { purchasedGames: { $each: purchasedGameIds } },
        $pull: { cartlist: { $in: purchasedGameIds } },
      },
      { new: true }
    );

    res.json({
      purchasedGames: purchasedGamesDetails,
      updatedCart: updatedUser.cartlist,
    });
  } catch (error) {
    console.error("Error handling payment success:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -favourites");

    res.json({ data: users });
  } catch (err) {
    console.error("Error getting all Users: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserProfile,
  deleteUserProfile,
  getGames,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  paymentSuccess,
  getAllUser,
};
