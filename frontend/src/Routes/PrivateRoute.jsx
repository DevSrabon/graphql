/* eslint-disable react/prop-types */

import { useQuery } from "@apollo/client";
import { Navigate, useLocation } from "react-router-dom";
import { ME_USER } from "../graphql/query";

const PrivateRoute = ({ children }) => {
  const { data, loading } = useQuery(ME_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    skip: !localStorage.getItem("token"),
  });

  console.log(data);
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
