import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useToken } from "../ctx/TokenContext";
import axios from "axios";

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

  // Additional states for validation and toggling password visibility
  const [editMode, setEditMode] = useState(false); // Toggle between edit and view mode
  const [showPassword, setShowPassword] = useState(false); // For showing/hiding password input
  const [nameError, setNameError] = useState(""); // To store name validation error
  const [emailError, setEmailError] = useState(""); // To store email validation error
  const [passwordError, setPasswordError] = useState(""); // To store password validation error

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role,
        joinDate: response.data.user.created_at,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/api/auth/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setPasswordError(""); // Clear the error when edit mode toggles
    setShowPassword(false); // Always hide the password when toggling out of edit mode
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation patterns
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/;
  const namePattern = /^[a-zA-Z ,.'-]{1,20}$/;
  const emailPattern = /^\S+@\S+\.\S+$/;

  const handleSave = () => {
    let valid = true;

    // Validate name
    if (!namePattern.test(formData.name)) {
      setNameError(
        "Uw naam moet alleen letters bevatten en mag niet langer dan 20 karakters zijn."
      );
      valid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!emailPattern.test(formData.email)) {
      setEmailError("Voer een geldig emailadres in.");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate password (if applicable)
    if (!passwordPattern.test(formData.password)) {
      setPasswordError(
        "Wachtwoord moet 8-16 tekens lang zijn, en minstens één hoofdletter, kleine letter en cijfer bevatten."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      alert("Profiel opgeslagen!");
      setEditMode(false);
      setShowPassword(false); // Hide password after saving
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        {token ? (
          <div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                  {nameError && <p className="text-red-500">{nameError}</p>}
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    readOnly
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Join Date
                  </label>
                  <input
                    type="text"
                    name="joinDate"
                    value={formData.joinDate}
                    readOnly
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 px-4 py-2 bg-prim-green text-white font-semibold rounded-lg hover:bg-tert-blue"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-6 ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            ) : user ? (
              <div>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-lg text-gray-900">{user.name}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Role
                  </label>
                  <p className="text-lg text-gray-900">{user.role}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">
                    Join Date
                  </label>
                  <p className="text-lg text-gray-900">{user.joinDate}</p>
                </div>

                <button
                  className="mt-6 px-4 py-2 bg-prim-green text-white font-semibold rounded-lg hover:bg-tert-blue"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Loading user data...</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Please log in to view your profile.</p>
        )}
      </div>
    </>
  );
}
