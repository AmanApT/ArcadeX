/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { setSellerGames } from "../../utils/gameSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ games }) => {
  const { sellerGames } = useSelector((store) => store.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [dispatch, games, sellerGames]);

  const salesData = {
    options: {
      chart: { type: "line" },
      xaxis: { categories: sellerGames?.map((game) => game.title) },
    },
    series: [
      {
        name: "Sold Copies",
        data: sellerGames?.map((game) => game.sold_copies),
      },
    ],
  };

  const pendingReviewsData = {
    options: {
      chart: { type: "bar" },
      xaxis: { categories: ["Pending", "Approved", "Rejected"] },
    },
    series: [
      {
        name: "Games by Status",
        data: [
          sellerGames?.filter((game) => game.status === "pending").length,
          sellerGames?.filter((game) => game.status === "approved").length,
          sellerGames?.filter((game) => game.status === "rejected").length,
        ],
      },
    ],
  };

  const genreData = {
    options: {
      chart: { type: "line" },
      xaxis: {
        categories: [
          "Action",
          "Adventure",
          "Open-world",
          "Horror",
          "Simulation",
          "RPG",
        ],
      },
    },
    series: [
      {
        name: "Games by Genre",
        data: [
          sellerGames?.filter((game) => game.genre === "Action").length,
          sellerGames?.filter((game) => game.genre === "Adventure").length,
          sellerGames?.filter((game) => game.genre === "Open-world").length,
          sellerGames?.filter((game) => game.genre === "Horror").length,
          sellerGames?.filter((game) => game.genre === "Simulation").length,
          sellerGames?.filter((game) => game.genre === "RPG").length,
        ],
      },
    ],
  };

  const tierData = {
    options: {
      chart: { type: "bar" },
      xaxis: { categories: ["Basic", "AA", "AAA"] },
    },
    series: [
      {
        name: "Games by Tier",
        data: [
          sellerGames?.filter((game) => game.tier === "Basic").length,
          sellerGames?.filter((game) => game.tier === "AA").length,
          sellerGames?.filter((game) => game.tier === "AAA").length,
        ],
      },
    ],
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-400">
          Dashboard Overview
        </h2>
        <span className="text-lg cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-300">Sold Copies</h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-4">
          <Chart
            options={salesData.options}
            series={salesData.series}
            type="line"
            height={350}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-300">
          Pending Reviews
        </h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-4">
          <Chart
            options={pendingReviewsData.options}
            series={pendingReviewsData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-300">Games by Genre</h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-4">
          <Chart
            options={genreData.options}
            series={genreData.series}
            type="line"
            height={350}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-300">Games by Tier</h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-4">
          <Chart
            options={tierData.options}
            series={tierData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
