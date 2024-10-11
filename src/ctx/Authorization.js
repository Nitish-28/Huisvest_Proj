import React from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../ctx/TokenContext";
import { ToastContainer, toast } from "react-toastify";
const PrivateRoute = ({ children }) => {
  const { token } = useToken();

  if (!token) {
    toast.warning("Unauthorized!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
