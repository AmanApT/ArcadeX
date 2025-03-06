/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameDetails } from "../../utils/gameSlice";
import axios from "axios";
import {
  addCartItem,
  removeCartItem,
  removeWishlistItem,
} from "../../utils/userSlice";
import { Bounce, toast } from "react-toastify";

const EachGame = ({ gameId, type }) => {
  const dispatch = useDispatch();
  const game = useSelector((store) => store.game.gameDetails[gameId]);

  useEffect(() => {
    if (!game) {
    

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/game/getGame/${gameId}`
          );
          dispatch(setGameDetails({ gameId, details: response.data.data }));
        } catch (error) {
          console.error("Error fetching game:", error);
        }
      };

      fetchData();
    }
  }, [gameId, game, dispatch]);

  const removeGame = async () => {
    try {
      let response;
      if (type === "cart") {
        response = await axios.delete(
          `http://localhost:5000/api/user/removeCartGame/${gameId}`,
          { withCredentials: true }
        );
        dispatch(removeCartItem(gameId));
      } else if (type === "wishlist") {
        response = await axios.delete(
          `http://localhost:5000/api/user/removeWishlistGame/${gameId}`,
          { withCredentials: true }
        );
        dispatch(removeWishlistItem(gameId));
      } else {
        console.warn("Unknown game type:", type);
        return;
      }

   
    } catch (err) {
      console.error("Error removing game:", err);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/user/addToCart",
        { gameId: game._id },
        { withCredentials: true }
      );

      dispatch(addCartItem(gameId));

      toast.success(response?.data.message, {
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
        transition: Bounce,
      });
    }
  };



  return (
    <div className="bg-[#202024] rounded-md p-6">
      <div className="flex gap-4">
        <div className="w-1/6 h-72 overflow-hidden">
          <img className="" src={game?.banner_img} alt="" />
        </div>
        <div className="w-5/6">
          <div className="flex justify-between items-center">
            <div className="p-2 px-4 text-sm rounded-md bg-[#414145] cursor-pointer">
              {game?.genre}
            </div>
            <p>{game?.price == 0 ? "Free" : `$ ${game?.price}`}</p>
          </div>
          <p className="my-3 text-2xl">{game?.title}</p>

          <div className="border-[#414145] p-4 border rounded-lg flex gap-4 items-center">
            <img
              className="w-[4rem]"
              src={`/src/assets/iarc/iarc_${game?.iarc}.png`}
              alt=""
            />
            <div className="text-sm ">
              <p>{game?.iarc}+</p>
              <p className="opacity-50">Mild Swearing, Violence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-end items-center justify-end gap-4">
        {type !== "myPurchases" && (
          <span
            className="hover:text-red-400 text-gray-500 text-bold"
            onClick={() => removeGame()}
          >
            Remove
          </span>
        )}
        {type === "wishlist" ? (
          <button
            className="p-3 px-6 rounded-md bg-blue-400 hover:bg-amber-400 cursor-pointer"
            onClick={() => addToCart()}
          >
            Add to Cart
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EachGame;
