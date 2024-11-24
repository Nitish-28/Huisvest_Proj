import { useState, useEffect } from "react";
import axios from "axios";
import ApiConnection from "../components/ApiConnection";

const useTokenValidating = () => {
  const [isValid, setIsValid] = useState(null); // null for loading state
  const [isSeller, setIsSeller] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state to prevent unnecessary renders

  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true); // Set loading state to true when making the API request
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsValid(false);
          return;
        }
        const response = await axios.get(`${ApiConnection()}/api/auth/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(response.data.success);
        localStorage.setItem('isSeller', response.data.isSeller);
        setIsSeller(response.data.isSeller);
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsLoading(false); // Set loading state to false after the request completes
      }
    };

    validateToken();
  }, []); // This effect only runs once when the component mounts

  return { isValid, isLoading, isSeller }; // Return both state and loading status
};

export default useTokenValidating;
