import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HouseListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    availability: false,
    address: "",
    city: "",
    state: "",
    zip: "",
    price: "",
    description: "",
    m2: "",
    bedrooms: "",
    bathrooms: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/d/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is being sent
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("House listing created successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="house-listing-form">
      <h1>Create House Listing</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Type</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Availability</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>City</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>State</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ZIP Code</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            className="border border-gray-300 rounded mr-4"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Square Meters (m²)</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="number"
            name="m2"
            value={formData.m2}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Bedrooms</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Bathrooms</label>
          <input
            className="border border-gray-300 rounded mr-4"
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default HouseListing;
