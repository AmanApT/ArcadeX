/* eslint-disable react/prop-types */
import Navbar from "../landingPage/Navbar";
import EachGame from "./EachGame";
import Footer from "../landingPage/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Checkout from "../checkoutPage/Checkout";
import { Bounce, ToastContainer } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

const UserGames = () => {
  const location = useLocation();
  const [componentType, setComponentType] = useState("cart");

  const cartItems = useSelector((store) => store.user?.cartlist);
  const wishlistedItems = useSelector((store) => store.user?.wishlist);
  const purchasedItems = useSelector((store) => store.user?.purchasedGames);
  const games = useSelector((store) => store.game?.games);
  const cartGames = games?.filter((game) => cartItems?.includes(game._id));

  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.slice(1);
    if (["cart", "wishlist", "myPurchases"].includes(path)) {
      setComponentType(path);
    }
  }, [location]);

  const totalPrice = cartGames?.reduce(
    (total, game) => total + parseFloat(game?.price),
    0
  );

  const taxRate = 0.1; // 10% tax
  const totalTax = totalPrice * taxRate;
  const finalTotal = totalPrice + totalTax;

  return (
    <section className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="mt-[5rem] mx-20 font-kdam">
        <div className="flex items-center gap-4">
          <IoIosArrowBack
            size={30}
            className="hover:cursor-pointer hover:opacity-80"
            onClick={() => navigate("/")}
          />
          {/* <input
            type="text"
            placeholder="Search Store"
            className="p-3 w-3/12 my-8 bg-[#242428] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>
        <p className="text-3xl py-8">
          My{" "}
          {componentType === "cart"
            ? "Cart"
            : componentType === "wishlist"
            ? "Wishlist"
            : "Purchases"}
        </p>

        <div className="flex flex-col gap-8">
          {componentType === "cart" ? (
            cartItems?.length!=0 ? cartItems?.map((id) => (
              <EachGame key={id} gameId={id} type={componentType} />
            )) :  <h1>No Games Found in Cart</h1>
          ) : componentType === "wishlist" ? (
            wishlistedItems?.length != 0 ? (
              wishlistedItems?.map((id) => (
                <EachGame key={id} gameId={id} type={componentType} />
              ))
            ) : (
              <h1>No Games Found in Wishlist</h1>
            )
          ) : (
            purchasedItems?.length!=0 ?  purchasedItems?.map((id) => (
              <EachGame key={id} gameId={id} type={componentType} />
            )) :  <h1>No Games Purchased</h1>
          )}
        </div>

        {/* Checkout Summary Section */}
        {componentType === "cart" && (
          <div className="mt-10 flex justify-between items-center border-t pt-8 border-gray-700">
            {/* Left Section: Price Details */}
            <div className="text-lg flex-1 max-w-xs">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Total Price</p>
                <p className="text-xl font-bold">${totalPrice?.toFixed(2)}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-400">Tax (10%)</p>
                <p className="text-xl font-bold text-gray-300">
                  ${totalTax?.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-400">Final Total</p>
                <p className="text-2xl font-bold text-white">
                  ${finalTotal?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Right Section: Checkout Button */}
            <div className="flex justify-end items-center flex-col space-y-4">
              <Checkout amount={finalTotal} cartItems={cartGames} />

              {cartItems?.length === 0 && (
                <p className="text-sm text-gray-400">Your cart is empty!</p>
              )}
            </div>
          </div>
        )}

        <Footer />
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
    </section>
  );
};

export default UserGames;
