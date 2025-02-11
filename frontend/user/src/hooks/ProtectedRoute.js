/* eslint-disable react/prop-types */

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredType }) => {
  const seller = useSelector((state) => state.seller);

  if (!seller || seller.type !== requiredType) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
