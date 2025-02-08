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

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const type = localStorage.getItem("type");
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          { type: type },
          { withCredentials: true }
        );
        if (!response.data.length===0) throw new Error("User not authenticated");

        console.log(response.data.data);

        dispatch(addUser(response.data.data));
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);

  const appRouter = createBrowserRouter([
    { path: "/auth/signup", element: <Signup /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/wishlist", element: <UserGames /> },
    { path: "/myPurchases", element: <UserGames /> },
    { path: "/cart", element: <UserGames /> },
    { path: "/", element: <LandingPage /> },
  ]);



  return <RouterProvider router={appRouter} />;
}

export default App;
