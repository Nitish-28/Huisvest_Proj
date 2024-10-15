
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ApiConnection from "../components/ApiConnection";
export default function Details() {

  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [apiData, setApiData] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage or wherever it's stored
        const token = localStorage.getItem('token');

        const response = await axios({
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          url: `${ApiConnection()}/api/content/${id}`,
        });
        setApiData(response.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Header />
      Now looking at: { id }
      { apiData ? (
        <div>
          <div>{apiData.address}</div>
          <div>{apiData.zip}</div>
          <div>{apiData.state}</div>
          <div>{apiData.type}</div>
          <div>{apiData.bedrooms}</div>
          <div>{apiData.bathrooms}</div>
          <div>{apiData.description}</div>
          <div>{apiData.price}</div>
        </div>
      ) : (<></>) }
    </div>
  )
}
