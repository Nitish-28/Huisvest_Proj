import React, { createContext, useState, useContext, useEffect } from "react";
import ApiConnection from "../components/ApiConnection";
const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  const logout = async () => {
    try {
      // Call the Laravel logout endpoint
      const response = await fetch(`${ApiConnection()}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear token from localStorage and update context
        localStorage.removeItem("token");
        setToken(null);

      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert('An error occurred while logging out');
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};
