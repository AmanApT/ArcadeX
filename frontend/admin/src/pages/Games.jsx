import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGames } from "../utils/gamesSlice";

const Games = () => {
  const dispatch = useDispatch();
  const { game } = useSelector((store) => store);

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/game/allGames",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       dispatch(setGames(response?.data.data));
  //     } catch (error) {
  //       console.error("Error fetching game:", error);
  //     }
  //   };

  //   if (!game) {
  //     fetchGames();
  //   }
  // }, [dispatch, game]);

  const handleApprove = async (gameId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/game/approveGame`,
        { _id: gameId },
        { withCredentials: true }
      );
      dispatch(
        setGames(
          game.map((eachGame) =>
            eachGame._id === gameId
              ? { ...eachGame, status: "approved" }
              : eachGame
          )
        )
      );
    } catch (error) {
      console.error("Error approving game:", error);
    }
  };

  const approvedGames = game?.filter((game) => game.status === "approved");

  const pendingGames = game?.filter((game) => game.status === "pending");

  console.log(pendingGames);

  return (
    <div className="bg-[#121212] text-white p-6 font-kdam">
      <h1 className="text-2xl mb-4">Approved Games</h1>
      <div className="grid grid-cols-3 gap-6">
        {approvedGames?.map((game) => (
          <div key={game._id} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={game.banner_img}
              alt={game.title}
              className="w-full h-88 object-cover rounded"
            />
            <h2 className="mt-2 text-lg">{game.title}</h2>
            <p className="text-gray-400">Sold Copies: {game.sold_copies}</p>
            <p className="text-gray-400">Status: {game.status}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-8 mb-4">Approval Requests</h2>
      <div className="grid grid-cols-2 gap-6">
        {pendingGames?.map((game) => (
          <div
            key={game._id}
            className="bg-gray-900 p-4 rounded-lg flex justify-between items-center"
          >
            <span>{game.title}</span>
            <button
              className="bg-green-600 px-3 py-1 rounded"
              onClick={() => handleApprove(game._id)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
