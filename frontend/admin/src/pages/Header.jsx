import axios from "axios";
import { useDispatch } from "react-redux";
import { removeAdmin } from "../utils/adminSlice";
import { IoSearch } from "react-icons/io5";
import { backend_url } from "../../../user/constants";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios(backend_url + "api/auth/signout", {
        withCredentials: true,
      });

      dispatch(removeAdmin());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex justify-between items-center bg-[#121212] p-6">
      <div className="w-full flex items-center justify-between">
        <div className="bg-gray-800 p-2 rounded flex items-center gap-2">
          <IoSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white"
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleLogout}
            className="bg-[#9810FA] px-3 py-2 rounded-md hover:opacity-80 cursor-pointer transition-all"
          >
            Sign Out
          </button>
          <img
            src="/src/assets/kanha.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
