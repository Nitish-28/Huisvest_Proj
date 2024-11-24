import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useToken } from "../ctx/TokenContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { token } = useToken();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    joinDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (token) fetchUserData();
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data.user;
      setUser(userData);

      setFormData({
        name: userData.name,
        email: userData.email,
        role: userData.isSeller ? "Verkoper" : "Koper",
        joinDate: userData.created_at,
      });

      setImage(
        userData.profile_picture ||
          "storage/profile_pictures/default-avatar.png"
      );

      setLoading(false);
    } catch (error) {
      console.error("Fout bij het ophalen van gebruikersgegevens:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("role", formData.role);

    if (selectedFile) formDataToSend.append("profile_picture", selectedFile);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/update-profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset image preview and selected file after profile update
      setImagePreview("");
      setSelectedFile(null);

      fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error("Fout bij het bijwerken van het profiel:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-sec-white min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64 gap-x-8 gap-y-2">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">Profiel</h2>
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Profielafbeeldingsectie */}
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-md">
            <img
              src={`http://127.0.0.1:8000/${image}`}
              alt="Profiel"
              className="w-40 h-40 rounded-full border-4 border-gray-300 mb-4 object-cover"
            />
            {isEditing && (
              <div className="w-full text-center">
                {/* File upload label styled as a button */}
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-blue-500 text-white font-semibold text-sm rounded-lg px-6 py-2 cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                  Kies bestand
                </label>
                {/* Hidden file input */}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {/* Display chosen file name or default message */}
                <p className="mt-2 text-gray-500 text-sm">
                  {selectedFile ? selectedFile.name : "Geen bestand gekozen"}
                </p>
                {/* Display preview if a file is selected */}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Voorbeeld"
                    className="w-24 h-24 rounded-full border-2 border-gray-300 mt-4 object-cover mx-auto"
                  />
                )}
              </div>
            )}

            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {formData.name}
              </h3>
              <p className="text-sm text-gray-500">
                Lid sinds: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Formuliersectie */}
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700">Naam</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Wijzigingen opslaan
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setIsEditing(false)}
                  >
                    Annuleren
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Naam</label>
                  <p className="text-lg text-gray-800">{user.name}</p>
                </div>
                <div>
                  <label className="block text-gray-700">E-mail</label>
                  <p className="text-lg text-gray-800">{user.email}</p>
                </div>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsEditing(true)}
                >
                  Profiel bewerken
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
