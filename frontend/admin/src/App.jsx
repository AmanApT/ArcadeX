/* eslint-disable react/prop-types */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import  { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAdmin } from "./utils/adminSlice";
import LoadingScreen from "./pages/LoadingScreen";
import Games from "./pages/Games";
import DashboardLayout from "./pages/DashboardLayout";
import Users from "./pages/Users";
import Sellers from "./pages/Sellers";
import { backend_url } from "../../user/constants";

function App() {
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await axios.post(
          backend_url + "api/auth/refresh",
          { type: "Admin" },
          { withCredentials: true }
        );

        if (response.data?.data) {
          dispatch(setAdmin(response.data.data));
        }

        // <Navigate to={"/"} />;
      } catch (err) {
        console.error("Admin verification failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!admin) {
      verifyAdmin();
    } else {
      setLoading(false);
    }
  }, [admin, dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  const appRouter = createBrowserRouter([
    {
      path: "/auth/login",
      element: admin ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/games", element: <Games /> },
        { path: "/users", element: <Users /> },
        { path: "/sellers", element: <Sellers /> },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

const ProtectedRoute = ({ children }) => {
  const admin = useSelector((state) => state.admin);

  return admin ? children : <Navigate to="/auth/login" />;
};

export default App;
