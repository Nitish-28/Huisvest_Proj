  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { HiBookmark } from "react-icons/hi";
  import Header from "../components/Header";
  import axios from "axios";
  import ApiConnection from "../components/ApiConnection";
  import MoneyFormat from "../components/MoneyFormat";
  import DashboardCards from "../components/DashboardCards"; // Assuming Card component is imported from this path
  import { formatDistanceToNow } from "date-fns";
  import SkeletonCard from "../components/SkeletonCard";

  export default function Details() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [bidAmount, setBidAmount] = useState(""); // State for bid amount
    const [bidMessage, setBidMessage] = useState(""); // State for success/error messages

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");

          // Fetch main property details
          const propertyResponse = await axios({
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            url: `${ApiConnection()}/api/content/${id}`,
          });
          setApiData(propertyResponse.data);

          // Fetch featured properties
          const featuredResponse = await axios({
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            url: `${ApiConnection()}/api/content`, // Adjust this endpoint to your actual API
          });
          setFeaturedProperties(featuredResponse.data.data);
        } catch (err) {
          setError("Error fetching data. Please try again." + err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id]);

    // Function to handle bid placement
    const handlePlaceBid = async () => {
      if (!bidAmount) {
        setBidMessage("Please enter a valid bid amount.");
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const bidResponse = await axios({
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          url: `${ApiConnection()}/api/bids`,
          data: {
            receiver_id: apiData.user_id, // assuming `user_id` is the property owner
            bid: bidAmount,
          },
        });

        // Display success message if the bid is placed successfully
        setBidMessage("Bid placed successfully!");
      } catch (error) {
        console.error("Error placing bid", error);
        setBidMessage("Error placing bid. Please try again.");
      }
    };

    // Display loading screen while data is being fetched
    if (loading) {
      return (
        <div>
          <Header />
          <SkeletonCard />

        </div>
      );
    }

    // Display error message if something goes wrong
    if (error) {
      return (
        <div>
          <Header />
          <div className="text-center py-5 text-red-500">{error}</div>
        </div>
      );
    }

    // Format the time since the property was created
    const timeAgo = formatDistanceToNow(new Date(apiData.created_at), {
      addSuffix: true,
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto p-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full object-cover h-48"
                src={
                  apiData.type === "apartment"
                    ? "https://images.pexels.com/photos/565324/pexels-photo-565324.jpeg"
                    : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="Property"
              />
              <div className="p-6">
              <p className="text-sm text-gray-500 mb-6">Listed {timeAgo}</p>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-4xl font-bold text-gray-800">{apiData.address}</h2>
                  {!apiData.availability && (
                    <span className="bg-red-100 text-red-500 font-medium px-2 py-1 rounded-md">
                      Sold
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                <MoneyFormat amount={apiData.price} />

                <div>
                    <p className="text-gray-600">{`${apiData.address}, ${apiData.zip}, ${apiData.state}`}</p>
                  </div>
                </div>

    
                {/* Details */}
                <div className="border-t border-gray-200 mt-4 pt-4 grid grid-cols-2 sm:grid-cols-2 gap-y-4 gap-x-2">
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Property Type:</h3>
                    <p className="text-gray-600">
                      {apiData.type.charAt(0).toUpperCase() + apiData.type.slice(1)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Bedrooms:</h3>
                    <p className="text-gray-600">{apiData.bedrooms}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Bathrooms:</h3>
                    <p className="text-gray-600">{apiData.bathrooms}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-lg font-medium text-gray-700">Description:</h3>
                    <p className="text-gray-600">{apiData.description}</p>
                  </div>
                </div>
    
                {/* Bookmark Button */}
                <div className="absolute top-4 right-4">
                  <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
                    <HiBookmark className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
    
                {/* Bidding Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Place a Bid:</h3>
                  <div className="flex items-center">
                    <input
                      type="number"
                      placeholder="Enter bid amount"
                      className="border border-gray-300 rounded-lg p-2 mr-4 w-32"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                      onClick={handlePlaceBid}
                    >
                      Place Bid
                    </button>
                  </div>
                  {bidMessage && (
                    <div className={`mt-4 ${bidMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                      {bidMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
    
            {/* Featured Properties */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Properties</h2>
              <div className="space-y-6">
                {featuredProperties.slice(0, 8).map((card) => (
                  <DashboardCards
                    key={card.id}
                    id={card.id}
                    type={card.type}
                    title={card.address}
                    price={card.price}
                    m2={card.m2}
                    bedrooms={card.bedrooms}
                    bathrooms={card.bathrooms}
                    city={card.city}
                    availability={card.availability}
                    created_at={card.created_at}

                    size={24}
                    text_size={12}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  }
