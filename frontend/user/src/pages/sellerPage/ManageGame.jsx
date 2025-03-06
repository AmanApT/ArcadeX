import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSellerGames, setSellerGames } from "../../utils/gameSlice";

/* eslint-disable react/prop-types */
const ManageGame = ({ games }) => {
  const { sellerGames } = useSelector((store) => store.game);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/game/sellerGames",
          games,
          { withCredentials: true }
        );
        dispatch(setSellerGames(response.data.games));
      } catch (err) {
        console.err("Error fetching games:", err);
      }
    };

    if (sellerGames?.length == 0) {
      fetchGames();
    }

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error fetching games</div>;
  }, [dispatch, games, sellerGames]);

  const handleDelete = async (gameId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/game/deleteGame",
        { gameId },
        { withCredentials: true }
      );
      dispatch(deleteSellerGames(gameId));
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-red-400">Manage Your Games</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-600">
              <th className="px-4 py-2">Banner</th>
              <th className="px-4 py-2">Game Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Sold Copies</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerGames?.map((game) => (
              <tr
                key={game._id}
                className="text-sm text-gray-300 hover:bg-gray-700"
              >
                <td className="px-4 py-2">
                  <img
                    className="w-24 h-24 object-cover rounded-md"
                    src={game?.banner_img}
                    alt="banner_img"
                  />
                </td>
                <td className="px-4 py-2">{game?.title}</td>
                <td className="px-4 py-2">{game?.price}</td>
                <td className="px-4 py-2">{game?.sold_copies}</td>
                <td className="px-4 py-2">{game?.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(game._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageGame;
