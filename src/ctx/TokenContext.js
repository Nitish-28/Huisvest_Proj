import React, { createContext, useState, useContext, useEffect } from "react";
import ApiConnection from "../components/ApiConnection";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate; // Hook to navigate programmatically
  try {
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
      window.location.reload();
    }
  } catch (error) {
    console.error("Error logging out:", error);
    window.location.reload();
  }
};

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};
