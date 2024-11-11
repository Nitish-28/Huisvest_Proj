import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCards from "../components/DashboardCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ApiConnection from "../components/ApiConnection";


export default function MyHouses({ totalViews }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [dailyViews, setDailyViews] = useState([]);

  useEffect(() => {
    const fetchDailyViews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ApiConnection()}/api/user/dailyviews`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDailyViews(response.data);
      } catch (err) {
        console.error("Error fetching daily views", err);
      }
    };
  
    fetchDailyViews();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage or wherever it's stored
        const token = localStorage.getItem("token");

        const response = await axios({
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          url: `${ApiConnection()}/api/d/list`,
        });
        setApiData(response.data);
        console.log(apiData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 gap-x-8 gap-y-2">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-2 gap-y-4 min-h-full">
      {/* Left side: List of houses */}
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold mb-4">My Houses</h2>
        {apiData.length ? (
          apiData.map((card) => (
            
            <DashboardCards
              type={card.type}
              title={card.address}
              price={card.price}
              id={card.id}
              views={card.views}
            />
          ))
        ) : (
          <div>No houses found.</div>
        )}
      </div>

      {/* Right side: Analytics */}
      <div className="col-span-1 p-4 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <p className="text-lg font-medium">Totale weergave: {totalViews}</p>
        {/* Add more analytics as needed */}
      </div>
    </div>
  );
}
