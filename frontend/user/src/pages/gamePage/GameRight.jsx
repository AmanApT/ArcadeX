import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { addCartItem, addWishlistItem } from "../../utils/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../../constants";

/* eslint-disable react/prop-types */
const GameRight = ({ price, gameId }) => {
  const [loading, setLoading] = useState(false);
  const { user, seller } = useSelector((state) => state);
  const navigate = useNavigate();

  const isPurchased = user?.purchasedGames?.includes(gameId);
  const stripePromise = loadStripe(
    "pk_test_51QrtvtGbJaoKMR0RH8rzbN24iY3zT6JQMbRJDJltzmC0FlHCZdZQKvgPv16msF8VFnpU8bd68y8jUJvfUIMLGT0100D5oNWhNJ"
  );

  const dispatch = useDispatch();
  const addToCart = async () => {
    try {
      if (!user) {
        navigate("/auth/login");
        return;
      }
      const data = await axios.patch(
        backend_url + "api/user/addToCart",
        { gameId: gameId },
        { withCredentials: true }
      );

      dispatch(addCartItem(gameId));

      toast.success(data?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    }
  };

  const addToWishlist = async () => {
    try {
      if (!user) {
        navigate("/auth/login");
        return;
      }
      const data = await axios.patch(
        backend_url + "api/user/addToWishlist",
        { gameId: gameId },
        { withCredentials: true }
      );

      dispatch(addWishlistItem(gameId));

      toast.success(data?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    }
  };

  const buyNow = async () => {
    try {
      if (!user) {
        navigate("/auth/login");
        return;
      }
      setLoading(true);
      const stripe = await stripePromise;
      const response = await axios.post(
        backend_url + "api/payment/createCheckoutSession",
        {
          gameId,
        },
        { withCredentials: true }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error(result.error);
      }
      setLoading(false);
    } catch (err) {
      toast.error("Failed to initiate payment. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8 mt-8">
      {!isPurchased ? (
        <>
          <button
            className={`p-3 w-84 text-black px-6 rounded-md bg-[#F7EBD1] hover:bg-amber-400 ${
              seller ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => buyNow()}
            disabled={seller ? true : false}
            title={seller ? "Sellers cannot purchase items" : ""}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
          <button
            className={`p-3 w-84 bg-[#242428] px-6 rounded-md hover:bg-amber-400 ${
              seller ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => addToCart()}
            disabled={seller ? true : false}
            title={seller ? "Sellers cannot add to cart" : ""}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="text-green-500 font-bold text-xl">Purchased</div>
      )}
      <button
        className={`p-3 w-84 bg-[#242428] px-6 rounded-md hover:bg-amber-400 ${
          seller ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => addToWishlist()}
        disabled={seller ? true : false}
        title={seller ? "Sellers cannot add to wishlist" : ""}
      >
        Add to Wishlist
      </button>
      <div className="text-2xl">{price == 0 ? "Free" : `$ ${price}`}</div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default GameRight;
