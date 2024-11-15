import React from "react";
import { Navigate } from "react-router-dom";
import useTokenValidating from "../hooks/useTokenValidating";

const ProtectedRoute = ({ children }) => {
  const { isValid, isLoading, isSeller } = useTokenValidating();

  if (isLoading) {
    return <div></div>; // Optionally show a loading spinner while checking the token
  }

  console.log("Is user a seller? " + isSeller);
  if (!isSeller) {
    return <Navigate to="/home" replace />; // Redirect to login if token is invalid
  }
  if (!isValid) {
    return <Navigate to="/login" replace />; // Redirect to login if token is invalid
  }


  return children; // Render protected content if token is valid
};

export default ProtectedRoute;
