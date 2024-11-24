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
    squareMeters: "",
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFormValid = () => {
    return (
      formData.homeName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.zip.trim() !== "" &&
      formData.price > 0 &&
      formData.description.trim() !== ""
    );
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        setError(error.response.data.message || "Something went wrong, please try again.");
      }
    }
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
                name="homeName"
                value={formData.homeName}
                onChange={handleInputChange}
                placeholder="Enter home name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Other Form Fields */}
            {/* Removed for brevity; ensure all other fields use name attributes matching formData keys */}

            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="bathrooms" className="block font-medium mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="Enter number of bathrooms"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a description of the house"
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="image" className="block font-medium mb-1">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

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
      </div>
    </div>
  );
};

export default HouseListing;
