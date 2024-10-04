import React, { createContext, useState, useContext } from "react";

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = async () => {
    try {
      // Call the Laravel logout endpoint
      const response = await fetch("https://chrisouboter.com/api/auth/logout", {
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
