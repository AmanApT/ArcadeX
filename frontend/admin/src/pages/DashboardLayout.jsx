import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSellers } from "../utils/sellerSlice";
import { setUsers } from "../utils/userSlice";
import { setGames } from "../utils/gamesSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { seller, user, game } = useSelector((store) => store);

  useEffect(() => {
    const fetchSellers = async () => {
      const sellers = await axios.get(
        "http://localhost:5000/api/seller/getAllSeller",
        { withCredentials: true }
      );

      dispatch(setSellers(sellers?.data.data));
    };

    const fetchUsers = async () => {
      const users = await axios.get(
        "http://localhost:5000/api/user/getAllUser",
        { withCredentials: true }
      );

      dispatch(setUsers(users?.data.data));
    };

    const fetchGames = async () => {
      const games = await axios.get("http://localhost:5000/api/game/allGames", {
        withCredentials: true,
      });

      dispatch(setGames(games?.data.data));
    };

    if (!seller) {
      fetchSellers();
    }
    if (!user) {
      fetchUsers();
    }
    if (!game) {
      fetchGames();
    }
  }, [dispatch, game, seller, user]);

  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <main className="flex-grow overflow-y-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
