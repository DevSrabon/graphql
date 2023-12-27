import { useQuery } from "@apollo/client";
import { Navigate, useLocation } from "react-router-dom";
import { ME_USER } from "../graphql/query";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { data, loading } = useQuery(ME_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    skip: !localStorage.getItem("token"),
  });

  const location = useLocation();
  if (loading) {
    return <h1>Admin Loading...</h1>;
  }
  if (data.user && data.user.role === "admin") {
    return children;
  }
  if (data.user && data.user.role === "user") {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
