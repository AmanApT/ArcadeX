import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../../constants";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    type: "User",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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
        backend_url + "api/auth/signup",
        userData
      );
      setSuccess("OTP sent to your email. Please verify.");
      setTimeout(
        () =>
          navigate(
            `/auth/verifyOtp?email=${userData.email}&type=${userData.type}`
          ),
        2000
      );
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen bg-black text-white relative flex items-center justify-center font-kdam tracking-wider">
      <img
        src="/src/assets/login/val_char.png"
        className="w-3/12 absolute right-0 top-1/2 translate-y-[-50%]"
        alt="val_char"
      />

      <div className="bg-[#18181C] p-16 rounded-xl shadow-lg w-5/12 h-11/12">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="name" className="block text-sm text-[#88888A] mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 bg-[#242428] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

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

          {/* Contact */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm text-[#88888A] mb-2"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={userData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
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
            {loading ? "Creating..." : "Continue"}
          </button>

          {/* Success/Error Message */}
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-3">{success}</p>
          )}

          {/* Already have an account link */}
          <div className="text-center text-sm -mt-3">
            <a href="#" className="text-[#88888A]">
              Already have an account?{" "}
              <span
                className="text-red-400 hover:text-red-500"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
