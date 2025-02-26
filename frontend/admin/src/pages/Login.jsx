import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "../utils/adminSlice";
import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../redux/adminSlice";

const Login = () => {
  const dispatch = useDispatch();
  //   const { loading, error } = useSelector((state) => state.admin);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { password: form.password, type: "Admin" },
        { withCredentials: true }
      );

      dispatch(setAdmin(response.data.data));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded outline-none"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 py-2 rounded font-bold hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
