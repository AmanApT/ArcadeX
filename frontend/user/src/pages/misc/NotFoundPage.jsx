import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#181713] text-white">
      <h1 className="text-6xl font-bold text-[#F7EBD1]">404</h1>
      <p className="text-xl text-gray-400 mt-2">Oops! Page not found.</p>

      <button
        className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
