import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import MoneyFormat from "./MoneyFormat";

function OutgoingBiddings() {
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBiddings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://127.0.0.1:8000/api/bids/get",
          {}, // Add payload here if needed
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach Bearer token
            },
          });
        setBiddings(response.data);
      } catch (err) {
        setError("Failed to load biddings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBiddings();
  }, []);

  return (
    <>
    <div className="mx-auto max-w-7xl px-4 py-6">
    <h2 className="text-xl   font-semibold text-gray-800">Uitgaande Biedingen</h2>
      <p className="text-gray-600">Uw uitgaande bids:</p>
      <div className="p-4 bg-white shadow rounded-md">
        {loading ? (
          <div className="bg-sec-white min-h-screen">
          <div className="flex justify-center items-center h-64 gap-x-8 gap-y-2">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </div>
        </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : biddings.length === 0 ? (
          <p className="text-gray-500">Geen uitgaande boden gevonden.</p>
        ) : (
          <ul className="space-y-4">
            {biddings.map((bid) => (
              <li
                key={bid.id}
                className={`p-4 border rounded-md flex items-center space-x-4 ${
                  bid.highest_bid <= bid.bid 
                    ? "border-green-500 bg-green-100"
                    : "border-red-500 bg-red-100"
                }`}
              >

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{bid.title}</h3>
                  <p className="text-gray-600">Uw bod: <MoneyFormat amount={bid.bid} /></p>
                  <p className="text-gray-600">Hoogste bod: <MoneyFormat amount={bid.highest_bid}/></p>
                  <p
                  className={`font-bold ${
                    bid.highest_bid <= bid.bid
                      ? "text-green-700" // Green if the highest bid is greater
                      : "text-red-700"  // Red if not
                  }`}
                >
                    Status: {bid.highest_bid <= bid.bid ? "Aan het winnen" : "Niet winnen"}
                  </p>
                </div>

                {/* Link to house */}
                <div className="ml-4">
                  <a
                    href={bid.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Property
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
     
    </>
  );
}

export default OutgoingBiddings;
