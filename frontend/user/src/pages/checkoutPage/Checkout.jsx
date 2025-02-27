/* eslint-disable react/prop-types */
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51QrtvtGbJaoKMR0RH8rzbN24iY3zT6JQMbRJDJltzmC0FlHCZdZQKvgPv16msF8VFnpU8bd68y8jUJvfUIMLGT0100D5oNWhNJ"
);

const Checkout = ({ amount, cartItems }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await axios.post(
      "http://localhost:5000/api/payment/createCheckoutSession",
      { cartItems, amount }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      console.error(result.error);
    }
    setLoading(false);
  };

  return (
    <button
      className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 ${
        cartItems?.length === 0 || loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-red-700"
      }`}
      disabled={cartItems?.length === 0 || loading}
      onClick={handleCheckout}
    >
      {loading ? "Processing..." : `Checkout - $${amount?.toFixed(2)}`}
    </button>
  );
};

export default Checkout;
