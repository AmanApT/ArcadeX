import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import Login from "./pages/authPage/Login";
import Signup from "./pages/authPage/Signup";
import LandingPage from "./pages/landingPage/LandingPage";
import "./App.css";
import axios from "axios";
import UserGames from "./pages/userGamePage/UserGames";
// import ProtectedRoute from "./hooks/ProtectedRoute";
import SellerDashboard from "./pages/sellerPage/SellerDashboard";
import { addSeller } from "./utils/sellerSlice";
import { setGames } from "./utils/gameSlice";
import GameDetailPage from "./pages/gamePage/GameDetailPage";

function App() {
  const dispatch = useDispatch();
  const { user, seller } = useSelector((store) => store);

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

        // console.log(response.data.data);

        if (type === "User") {
          dispatch(addUser(response.data.data));
        } else if (type === "Seller") {
          dispatch(addSeller(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    if (!user && !seller) {
      fetchUser();
    }
  }, [dispatch, user, seller]);

  const appRouter = createBrowserRouter([
    { path: "/auth/signup", element: <Signup /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/wishlist", element: <UserGames /> },
    { path: "/myPurchases", element: <UserGames /> },
    { path: "/cart", element: <UserGames /> },
    { path: "/", element: <LandingPage /> },
    { path: "/seller", element: <SellerDashboard /> },
    { path: "/game", element: <GameDetailPage /> },

    // {
    //   element: <ProtectedRoute requiredType={"Seller"} />,
    //   children: [
    //     {
    //       path: "/seller",
    //       element: <SellerDashboard />,
    //     },
    //   ],
    // },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
