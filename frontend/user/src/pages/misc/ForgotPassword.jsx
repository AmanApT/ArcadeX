import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending reset email. Try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#18181C] p-10 rounded-xl shadow-lg w-4/12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-2">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-[#242428] text-white rounded-md focus:outline-none"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="w-full mt-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="text-center mt-3 text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
