import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/resetPassword", {
        token,
        password,
      });
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (error) {
      setMessage("Invalid or expired token.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#18181C] p-10 rounded-xl shadow-lg w-4/12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-[#242428] text-white rounded-md focus:outline-none"
            placeholder="Enter new password"
          />
          <button
            type="submit"
            className="w-full mt-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="text-center mt-3 text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
