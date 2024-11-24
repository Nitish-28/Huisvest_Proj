import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HouseListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    homeName: "",
    type: "",
    availability: false,
    address: "",
    city: "",
    state: "",
    zip: "",
    m2: "",
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFormValid = () => {
    return (
      formData.homeName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.zip.trim() !== "" &&
      formData.price > 0
    );
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle price changes with validation
  const handlePriceChange = (event) => {
    
    const value = event.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100000000)) {
      setPrice(value === "" ? 0 : Number(value));
    }
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
        setError(error.response.data.message || "Er was een probleem, probeer het nog een keer");
      }
    }
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create House Listing</h1>
      <p>Meld een huis aan voor op Huisvest.</p>

      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
         
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="homeName" className="block font-medium mb-1">
                Home Name
              </label>
              <input
                type="text"
                id="homeName"
                value={formData.homeName}
                onChange={handleInputChange}
                placeholder="Enter home name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="homeName" className="block font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block font-medium mb-1">
                Type
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="block font-medium mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block font-medium mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="zip" className="block font-medium mb-1">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="Enter zip code"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="m2" className="block font-medium mb-1">
                Square Meters
              </label>
              <input
                type="number"
                id="m2"
                value={formData.m2}
                onChange={handleInputChange}
                placeholder="Enter square meters"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="bedrooms" className="block font-medium mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="Enter number of bedrooms"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="bathrooms" className="block font-medium mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="Enter number of bathrooms"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-medium">Available</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold py-2 rounded ${
                isFormValid()
                  ? "bg-tert-blue hover:bg-[#419695] duration-200 ease-in-out transform"
                  : "bg-tert-blue opacity-50 cursor-not-allowed"
              } text-white`}
              disabled={!isFormValid()}
            >
              Submit Listing
            </button>
          </form>
        </div>

        {/* House Details Display */}
        <div className="w-full md:w-1/4 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">House Details</h2>
          <div className="mb-2">
            <strong>Home Name:</strong> {formData.homeName}
          </div>
          <div className="mb-2">
            <strong>Type:</strong> {formData.type}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> ${formData.price}
          </div>
          <div className="mb-2">
            <strong>Bedrooms:</strong> {formData.bedrooms}
          </div>
          <div className="mb-2">
            <strong>Bathrooms:</strong> {formData.bathrooms}
          </div>
          <div className="mb-2">
            <strong>Square Meters:</strong> {formData.m2}
          </div>
          <div className="mb-2">
            <strong>Description:</strong> {formData.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListing;
