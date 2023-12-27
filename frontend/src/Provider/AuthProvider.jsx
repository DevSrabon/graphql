/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { createContext } from "react";
import { ME_USER } from "../graphql/query";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { data, loading, error } = useQuery(ME_USER);

  const authInfo = {
    data,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
