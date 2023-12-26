/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { createContext } from "react";
export const AuthContext = createContext();
const ME_USER = gql`
  query Query {
    user {
      name
      email
      password
    }
  }
`;
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
