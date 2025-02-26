import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import Login from "./pages/authPage/Login";
import Signup from "./pages/authPage/Signup";
import LandingPage from "./pages/landingPage/LandingPage";
import "./App.css";
import axios from "axios";
import UserGames from "./pages/userGamePage/UserGames";
import ProtectedRoute from "./hooks/ProtectedRoute";
import SellerDashboard from "./pages/sellerPage/SellerDashboard";
import { addSeller } from "./utils/sellerSlice";
import { setGames } from "./utils/gameSlice";
import GameDetailPage from "./pages/gamePage/GameDetailPage";
import Success from "./pages/checkoutPage/Success";
import VerifyOTP from "./pages/misc/VerifyOtp";
import LoadingScreen from "./pages/misc/LoadingScreen";
import NotFoundPage from "./pages/misc/NotFoundPage";
import ForgotPassword from "./pages/misc/ForgotPassword";
import ResetPassword from "./pages/misc/ResetPassword";
import Test from "./Test";

function App() {
  const dispatch = useDispatch();
  const { user, seller } = useSelector((store) => store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseGames = await axios.get(
          "http://localhost:5000/api/game/landingPageGames",
          { withCredentials: true }
        );

        dispatch(setGames(responseGames.data.data));

        const type = localStorage.getItem("type");
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          { type: type },
          { withCredentials: true }
        );

        if (response.data.length === 0) {
          throw new Error("User not authenticated");
        }

        if (type === "User") {
          dispatch(addUser(response.data.data));
        } else if (type === "Seller") {
          dispatch(addSeller(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user && !seller) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, user, seller]);

  if (loading) {
    return <LoadingScreen />;
  }

  const appRouter = createBrowserRouter([
    {
      path: "/auth/signup",
      element: user || seller ? <LandingPage /> : <Signup />,
    },
    {
      path: "/auth/login",
      element: user || seller ? <LandingPage /> : <Login />,
    },
    // { path: "/auth/login", element: <Login /> },
    {
      element: <ProtectedRoute requiredType="User" />,
      children: [
        { path: "/wishlist", element: <UserGames wishlist={user?.wishlist} /> },
        {
          path: "/myPurchases",
          element: <UserGames purchasedGames={user?.purchasedGames} />,
        },
        { path: "/cart", element: <UserGames cartlist={user?.cartlist} /> },
      ],
    },
    { path: "/", element: <LandingPage /> },
    { path: "/game/:gameId", element: <GameDetailPage /> },
    {
      path: "/test",
      element: <Test />,
    },
    {
      element: <ProtectedRoute requiredType="Seller" />,
      children: [{ path: "/seller", element: <SellerDashboard /> }],
    },
    // Right now this path is not secured
    { path: "/success", element: <Success /> },
    {
      path: "/auth/verifyOtp",
      element: <VerifyOTP />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/resetPassword/:token",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
