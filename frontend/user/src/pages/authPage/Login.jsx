import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { addSeller } from "../../utils/sellerSlice";
import { backend_url } from "../../../constants";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    type: "User", // Default type is "User"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        backend_url + "api/auth/signin",
        userData,
        {
          withCredentials: true,
        }
      );
      setSuccess("Logged In Successfully!!");

      const {
        cartlist = [],
        email = "",
        favourites = [],
        isShadowBan = false,
        name = "",
        purchasedGames = [],
        wishlist = [],
        _id = "",
        type,
        isVerified = false,
        games = [],
      } = response.data.data || {};

      localStorage.setItem("type", userData.type);

      if (userData.type === "Seller") {
        dispatch(
          addSeller({
            _id,
            name,
            email,
            games,
            isVerified,
            type,
          })
        );
        navigate("/");
      } else if (userData.type === "User") {
        dispatch(
          addUser({
            _id,
            name,
            email,
            cartlist,
            favourites,
            isShadowBan,
            purchasedGames,
            wishlist,
            type,
          })
        );
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen h-screen bg-black text-white relative flex items-center justify-center font-kdam tracking-wider">
      <img
        src="/src/assets/login/val_char.png"
        className="w-3/12 absolute right-0 top-1/2 translate-y-[-50%]"
        alt="val_char"
      />
      <div className="bg-[#18181C] p-16 rounded-xl shadow-lg w-5/12">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[#88888A] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-3 bg-[#242428] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[#88888A] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 bg-[#242428] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* User Type */}
          <div className="mt-4">
            <label htmlFor="type" className="block text-sm text-[#88888A] mb-2">
              Select User Type
            </label>
            <select
              name="type"
              id="type"
              value={userData.type}
              onChange={handleChange}
              className="w-full p-3 bg-[#242428] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-9 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Success/Error Message */}
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-3">{success}</p>
          )}
          <p className="text-sm text-center">
            <a
              onClick={() => navigate("/forgotPassword")}
              className="text-red-500 hover:underline"
            >
              Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
