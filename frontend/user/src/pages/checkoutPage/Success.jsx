import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addPurchasedItem, removeCartItem } from "../../utils/userSlice";

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
          "http://localhost:5000/api/user/paymentSuccess",
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

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p
        onClick={() => navigate("/")}
        className="text-blue-400 hover:text-blue-500"
      >
        Go Home
      </p>
    </div>
  );
};

export default Success;
