import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const navigate = useNavigate();
  const email = new URLSearchParams(useLocation().search).get("email");
  const type = new URLSearchParams(useLocation().search).get("type");



  const handleVerify = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verifyOtp",
        { email, otp, type }
      );
      setStatusCode(response.status);

      setSuccess("Account verified successfully!");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
     
      setStatusCode(err?.status);

      setError(err?.response?.data?.message);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-[#18181C] p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center">Verify OTP</h2>
        <p className="text-center text-sm text-gray-400 mb-4">
          Enter the OTP sent to {email}
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 bg-[#242428] text-white rounded-md text-center"
        />

        <button
          onClick={handleVerify}
          className="w-full mt-4 py-2 bg-blue-600 rounded-md"
        >
          Verify
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {statusCode == "410" ? (
          <p className="text-center text-sm text-[#88888A]">
            <span
              className="text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              onClick={() => navigate("/auth/signup")}
            >
              Sign Up
            </span>{" "}
            Again!
          </p>
        ) : (
          <></>
        )}
        {success && (
          <p className="text-green-500 text-center mt-3">{success}</p>
        )}
      </div>
    </section>
  );
};

export default VerifyOTP;
