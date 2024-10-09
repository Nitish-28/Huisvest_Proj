import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCards from '../components/DashboardCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function MyHouses() {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          url: 'https://chrisouboter.com/api/d/list',
        });
        setApiData(response.data);
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
    <div className="grid grid-cols-1 gap-2">
      {apiData.length > 1 ? (
        apiData.map((card) => (
          <DashboardCards
            type={card.type}
            key={card.id}
            title={card.address}
            price={card.price}
          />
        ))
      ) : (
        <div>No houses found.</div>
      )}
    </div>
  );
}
