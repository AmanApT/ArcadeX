const express = require("express");
const Stripe = require("stripe");
const Game = require("../models/game");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/createCheckoutSession",async (req, res) => {
  try {
    const { cartItems, gameId } = req.body;

    // Single item checkout
    if (gameId) {
      const game = await Game.findById(gameId);

      if (!game) {
        return res.status(404).send("Game not found.");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: game.title,
                images: [game.banner_img],
                metadata: { gameId: game._id.toString() },
              },
              unit_amount: Math.round(game.price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:5173/cancel",
      });

      return res.json({ id: session.id });
    }

    // cart checkout
    if (cartItems && cartItems.length > 0) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map((game) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: game.title,
              images: [game.banner_img],
              metadata: { gameId: game._id.toString() },
            },
            unit_amount: Math.round(game.price * 100),
          },
          quantity: 1,
        })),
        mode: "payment",
        success_url:
          "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/cancel",
      });

      return res.json({ id: session.id });
    }

    return res.status(400).send("Invalid request");
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
