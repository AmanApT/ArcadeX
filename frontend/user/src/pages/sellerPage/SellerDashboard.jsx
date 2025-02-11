import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import UploadGame from "./UploadGame";
import ManageGame from "./ManageGame";
import Profile from "./Profile";
import { FaGamepad, FaUpload, FaList, FaUser } from "react-icons/fa";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "dashboard"
  );
  const [games, setGames] = useState([]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-kdam">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 p-6 flex flex-col gap-6 border-r border-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <FaGamepad /> Seller Hub
        </h2>
        <nav className="flex flex-col gap-4 text-lg">
          {[
            { name: "dashboard", icon: <FaGamepad />, label: "Dashboard" },
            { name: "upload", icon: <FaUpload />, label: "Upload Game" },
            { name: "manage", icon: <FaList />, label: "Manage Games" },
            { name: "profile", icon: <FaUser />, label: "Profile" },
          ].map(({ name, icon, label }) => (
            <button
              key={name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-purple-600 hover:text-black text-gray-300 ${
                activeTab === name ? "bg-purple-500 text-black" : ""
              }`}
              onClick={() => setActiveTab(name)}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard games={games} />}
        {activeTab === "upload" && (
          <UploadGame games={games} setGames={setGames} />
        )}
        {activeTab === "manage" && (
          <ManageGame games={games} setGames={setGames} />
        )}
        {activeTab === "profile" && <Profile />}
      </main>
    </div>
  );
};

export default SellerDashboard;
