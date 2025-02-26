/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "../pages/misc/LoadingScreen";

const ProtectedRoute = ({ requiredType }) => {
  const { user, seller } = useSelector((state) => state);
  const type = localStorage.getItem("type");

  if (type && !user && !seller) {
    return <LoadingScreen />;
  }

  const isAuthenticated = () => {
    if (requiredType === "Seller") {
      return seller && type === "Seller";
    }
    if (requiredType === "User") {
      return user && type === "User";
    }
    return false;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
