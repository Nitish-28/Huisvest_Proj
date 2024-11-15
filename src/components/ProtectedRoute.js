import React from "react";
import { Navigate } from "react-router-dom";
import useTokenValidating from "../hooks/useTokenValidating";
import { ToastContainer, toast } from "react-toastify";
const ProtectedRoute = ({ children }) => {
  const { isValid, isLoading, isSeller } = useTokenValidating();

  if (isLoading) {
    return <div></div>; // Optionally show a loading spinner while checking the token
  }

  if (!isValid) {
    toast.warning("Please login to access this page.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to="/login" replace />; // Redirect to login if token is invalid
  }

  return children; // Render protected content if token is valid
};

export default ProtectedRoute;
