import { useEffect, useState } from "react";
import axios from "axios";
import ApiConnection from "../components/ApiConnection";

export const useSavedHouses = () => {
     const [savedHouses, setSavedHouses] = useState([]);
     const [loading, setLoading] = useState(true);
     const token = localStorage.getItem('token');
     useEffect(() => {
          const fetchData = async () => {
          if (token) {
          try {
               const response = await axios({
               method: "GET",
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
               },
               url: `${ApiConnection()}/api/fav/saves`,
               });
               setSavedHouses(response.data.map(house => house.id));
               setLoading(false);
          } catch (err) {
               console.error("Error fetching notifications:", err);
          }
          }
          };
     fetchData();
     }, []);

     return {savedHouses, loading};
};
