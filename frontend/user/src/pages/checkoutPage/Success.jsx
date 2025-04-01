import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addPurchasedItem, removeCartItem } from "../../utils/userSlice";
// import { CheckCircleIcon } from "@heroicons/react/solid";
import { FaRegCheckCircle } from "react-icons/fa";
import { backend_url } from "../../../constants";

const Success = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const requestMade = useRef(false);
  const type = localStorage.getItem("type");

  useEffect(() => {
    if (!sessionId || !user?._id || requestMade.current) return;

    const updateUserData = async () => {
      try {
        requestMade.current = true;
        const { data } = await axios.post(
          backend_url + "api/user/paymentSuccess",
          { userId: user._id, sessionId },
          { withCredentials: true }
        );

        data.purchasedGames.forEach((game) =>
          dispatch(addPurchasedItem(game._id))
        );
        data.purchasedGames.forEach((game) =>
          dispatch(removeCartItem(game._id))
        );
      } catch (error) {
        console.error("Payment update failed:", error);
        requestMade.current = false;
      }
    };

    updateUserData();
  }, [sessionId, user._id, dispatch, type]);
  // bg-[url(/src/assets/img.jpg)] 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-cover bg-[url(/src/assets/img.jpg)] px-4">
      <div className="bg-white shadow-lg rounded-2xl hover:scale-102 backdrop-blur-xl shadow-black transition delay-150 duration-300 ease-in-out p-6 text-center max-w-md w-1/2">
      <FaRegCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        {/* <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" /> */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-green-600 cursor-pointer text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Success;