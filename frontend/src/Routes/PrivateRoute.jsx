/* eslint-disable react/prop-types */
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { data, loading } = useContext(AuthContext);
  console.log("🚀 ~ file: PrivateRoute.jsx:9 ~ PrivateRoute ~ data:", data);
  const location = useLocation();
  if (loading) {
    return <h1>Private Loading...</h1>;
  }
  if (data?.user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
