import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../utils/fudSlice";
import Fud from "./Fud";
import axios from "axios";
import { verifySeller } from "../utils/sellerSlice";

const Sellers = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((store) => store.seller);
  const games = useSelector((store) => store.game);
  const [expandedSellers, setExpandedSellers] = useState({});

  // Handle seller approval/removal
  const handleRemoveSeller = (sellerId) => {
    dispatch(openDialog("Seller Remove"));
  };

  const handleFeatureUnderDevelopment = () => {
    dispatch(openDialog("New Seller Management Dashboard"));
  };

  // Toggle seller's game list visibility
  const toggleSellerGames = (sellerId) => {
    setExpandedSellers((prev) => ({
      ...prev,
      [sellerId]: !prev[sellerId],
    }));
  };

  const handleApproveSeller = async (sellerId) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/seller/verifySeller",
        { _id: sellerId },
        { withCredentials: true }
      );

      dispatch(verifySeller(sellerId));
    } catch (err) {
      console.error("Error verifying seller:", err);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white font-kdam p-6">
      <h1 className="text-2xl mb-6">Seller Management</h1>
      <div className="grid grid-cols-1 gap-6">
        {sellers?.length > 0 ? (
          sellers.map((seller) => (
            <div key={seller._id} className="bg-gray-800 p-4 rounded-lg">
              {/* Seller Info */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{seller.name}</p>
                  <span className="text-sm text-gray-400">
                    {games?.filter((game) => game.author === seller._id).length}{" "}
                    games
                  </span>
                  <p className="mt-2">
                    Seller Verified - {seller.isVerified ? "✅" : "❌"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveSeller(seller._id)}
                    className={`bg-green-600 text-white px-3 py-1 rounded-lg hover:opacity-80 ${
                      seller.isVerified
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } `}
                    disabled={seller.isVerified}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRemoveSeller(seller._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer hover:opacity-80"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => toggleSellerGames(seller._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg cursor-pointer hover:opacity-80"
                  >
                    {expandedSellers[seller._id] ? "Hide Games" : "Show Games"}
                  </button>
                </div>
              </div>

              {/* Games Dropdown */}
              {expandedSellers[seller._id] && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Games List</h2>
                  {games.filter((game) => game.author === seller._id).length >
                  0 ? (
                    <ul className="space-y-2">
                      {games
                        .filter((game) => game.author === seller._id)
                        .map((game) => (
                          <li
                            key={game._id}
                            className="bg-gray-600 p-2 rounded-md text-gray-300"
                          >
                            {game.title}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No games available</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No sellers found.</p>
        )}
      </div>

      <Fud />
    </div>
  );
};

export default Sellers;
