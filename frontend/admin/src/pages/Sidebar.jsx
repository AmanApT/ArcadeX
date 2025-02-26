import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "/dashboard"
  );

  useEffect(() => {
    setActiveTab(location.pathname);
    localStorage.setItem("activeTab", location.pathname);
  }, [location.pathname]);

  return (
    <aside className="w-1/6 p-6 border-r border-[#454445] bg-[#121212] font-kdam text-white h-screen overflow-hidden">
      <h1 className="text-xl text-[#F7EBD1] mb-6">ARCADEX - ADMIN PANEL</h1>
      <hr className="border-[#454445] mb-6 w-full" />
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className={`hover:text-gray-400 ${
            activeTab === "/" ? "text-blue-500" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/games"
          className={`hover:text-gray-400 ${
            activeTab === "/games" ? "text-blue-500" : ""
          }`}
        >
          Games
        </Link>
        <Link
          to="/users"
          className={`hover:text-gray-400 ${
            activeTab === "/users" ? "text-blue-500" : ""
          }`}
        >
          Users
        </Link>
        <Link
          to="/sellers"
          className={`hover:text-gray-400 ${
            activeTab === "/sellers" ? "text-blue-500" : ""
          }`}
        >
          Sellers
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
