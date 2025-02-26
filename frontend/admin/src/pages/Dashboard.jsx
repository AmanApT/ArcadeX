import React from "react";
// import Sidebar from "./Sidebar";
// import axios from "axios";
import { useSelector } from "react-redux";
// import { setSellers } from "../utils/sellerSlice";
// import { setUsers } from "../utils/userSlice";
// import { setGames } from "../utils/gamesSlice";

const Dashboard = () => {
  // const dispatch = useDispatch();
  const { seller, user, game } = useSelector((store) => store);

  const topPerformingGame = game
    ?.slice()
    .sort((a, b) => b.sold_copies - a.sold_copies)[0];

  const pendingApprovalGames = game
    ?.slice()
    .filter((eachGame) => eachGame.status === "pending");

  return (
    <div className="bg-[#121212] min-h-screen text-white flex font-kdam">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <main className="grid grid-cols-12 gap-6">
          <section className="col-span-7 relative">
            <img
              src={topPerformingGame?.banner_img}
              alt="Top Game"
              className="w-full aspect-[16/9] rounded-lg h-88 object-fill"
            />
            <div className="absolute bottom-4 left-4 text-lg bg-black bg-opacity-50 p-2 rounded">
              Top Performing Game - {topPerformingGame?.title}
            </div>
          </section>

          <section className="col-span-5">
            <h2 className="text-lg mb-2">Approval Requests</h2>
            <div className="flex flex-col gap-2">
              {pendingApprovalGames?.map((eachGame) => (
                <div
                  key={eachGame._id}
                  className="bg-gray-800 p-3 rounded flex justify-between items-center"
                >
                  <span>{eachGame?.title}</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <section>
            <h2 className="text-lg mb-2">Sellers</h2>
            <div className="bg-gray-900 p-4 rounded-lg">
              {seller?.map((seller) => (
                <div
                  key={seller._id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p>{seller?.name}</p>
                    <span className="text-sm text-gray-400">
                      {seller?.games.length} games
                    </span>
                  </div>
                  <button className="bg-purple-600 px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg mb-2">Users</h2>
            <div className="bg-gray-900 p-4 rounded-lg">
              {user?.map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center mb-2"
                >
                  <p>{user?.name}</p>
                  <button className="bg-red-600 px-3 py-1 rounded">Ban</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
