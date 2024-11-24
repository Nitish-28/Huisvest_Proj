import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HouseListing = ({ changePage }) => {
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
        setSuccess("Huisaanbieding succesvol aangemaakt!");
        setTimeout(() => {
          changePage("Mijn huizen");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(
          error.response.data.message ||
            "Er was een probleem, probeer het opnieuw"
        );
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
      <h1 className="text-2xl font-bold mb-4">Maak een Huis aanbod</h1>
      <p>Meld een huis aan voor op Huisvest.</p>

      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="homeName" className="block font-medium mb-1">
                Huisnaam
              </label>
              <input
                type="text"
                id="homeName"
                value={formData.homeName}
                onChange={handleInputChange}
                placeholder="Voer huisnaam in"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Beschrijving
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Voer beschrijving in"
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
                  Selecteer type
                </option>
                <option value="apartment">Appartement</option>
                <option value="house">Huis</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block font-medium mb-1">
                Adres
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Voer adres in"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="block font-medium mb-1">
                Stad
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Voer stad in"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block font-medium mb-1">
                Staat
              </label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Voer staat in"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="zip" className="block font-medium mb-1">
                Postcode
              </label>
              <input
                type="text"
                id="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="Voer postcode in"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="m2" className="block font-medium mb-1">
                Vierkante meters
              </label>
              <input
                type="number"
                id="m2"
                value={formData.m2}
                onChange={handleInputChange}
                placeholder="Voer vierkante meters in"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Prijs
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Voer prijs in"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="bedrooms" className="block font-medium mb-1">
                Slaapkamers
              </label>
              <input
                type="number"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="Voer aantal slaapkamers in"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="bathrooms" className="block font-medium mb-1">
                Badkamers
              </label>
              <input
                type="number"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="Voer aantal badkamers in"
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
              <label className="font-medium">Beschikbaar</label>
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
              Verstuur Aanbod
            </button>
          </form>
        </div>

        {/* House Details Display */}
        <div className="w-full md:w-1/4 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Huisdetails</h2>
          <div className="mb-2">
            <strong>Huisnaam:</strong> {formData.homeName}
          </div>
          <div className="mb-2">
            <strong>Type:</strong> {formData.type}
          </div>
          <div className="mb-2">
            <strong>Prijs:</strong> €{formData.price}
          </div>
          <div className="mb-2">
            <strong>Slaapkamers:</strong> {formData.bedrooms}
          </div>
          <div className="mb-2">
            <strong>Badkamers:</strong> {formData.bathrooms}
          </div>
          <div className="mb-2">
            <strong>Vierkante meters:</strong> {formData.m2}
          </div>
          <div className="mb-2">
            <strong>Beschrijving:</strong> {formData.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListing;
