import React, { useState } from "react";
import Header from "../components/Header";

export default function HouseListing() {
  const [formData, setFormData] = useState({
    homeName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    type: "",
    squareMeters: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null); // State to hold the uploaded image

  const isFormValid = () => {
    return (
      formData.homeName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.zip.trim() !== "" &&
      price > 0 &&
      image !== null // Ensure an image is uploaded
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the uploaded image file
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-prim-green gap-8 mt-8 p-8 font-bold text-6xl text-white">
        Huisvest
      </div>
      <div className="flex gap-8 mt-8 p-8">
        <div className="flex-1">
          <form className="space-y-4">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="homeName"
                className="w-1/6 text-right font-medium"
              >
                Home Name*
              </label>
              <input
                type="text"
                id="homeName"
                value={formData.homeName}
                onChange={handleInputChange}
                placeholder="Enter home name"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="address" className="w-1/6 text-right font-medium">
                Address*
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="city" className="w-1/6 text-right font-medium">
                City*
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="state" className="w-1/6 text-right font-medium">
                State*
              </label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="zip" className="w-1/6 text-right font-medium">
                Zip*
              </label>
              <input
                type="text"
                id="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="Enter zip code"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="type" className="w-1/6 text-right font-medium">
                Type
              </label>
              <input
                type="text"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Enter type"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="squareMeters"
                className="w-1/6 text-right font-medium"
              >
                m²
              </label>
              <input
                type="text"
                id="squareMeters"
                value={formData.squareMeters}
                onChange={handleInputChange}
                placeholder="Enter square meters"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="bedrooms"
                className="w-1/6 text-right font-medium"
              >
                Bedrooms
              </label>
              <input
                type="text"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="Enter number of bedrooms"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="bathrooms"
                className="w-1/6 text-right font-medium"
              >
                Bathrooms
              </label>
              <input
                type="text"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="Enter number of bathrooms"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="price" className="w-1/6 text-right font-medium">
                Price (€)*
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter price"
                className="w-2/4 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={!isFormValid()}
                className="bg-tert-blue text-white py-2 px-4 rounded disabled:opacity-50 hover:bg-[#62e3e1] duration-300 ease-in-out transform"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Image Upload Section */}
        <div className="w-1/3">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            {image && (
              <img
                src={URL.createObjectURL(image)} // Create a URL for the selected image
                alt="House Preview"
                className="mb-2 w-full h-32 object-cover rounded" // Style the preview image
              />
            )}
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*" // Accept image files only
              className="p-2 border border-gray-300 rounded mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
