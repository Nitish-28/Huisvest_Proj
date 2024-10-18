import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useToken } from '../ctx/TokenContext';
import axios from 'axios';

export default function Profile() {
  const { token } = useToken();
<<<<<<< Updated upstream
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [nameError, setNameError] = useState(""); // State for name error
  const [emailError, setEmailError] = useState(""); // State for email error

  // Simulate user data for the profile
  const [user, setUser] = useState({
    name: "Naam",
    email: "voorbeeld@voorbeeld.com",
    password: "*****",
  });
=======
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    joinDate: '',
  });

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user', {
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
      console.error('Error fetching user data:', error);
    }
  };
>>>>>>> Stashed changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:8000/api/auth/user', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/; // Password: 8-16 characters, at least one uppercase, lowercase, and number
  const namePattern = /^[a-zA-Z ,.'-]{1,20}$/; // Name: Only letters, up to 20 characters
  const emailPattern = /^\S+@\S+\.\S+$/; // Email: Basic email validation

  const handleSave = () => {
    let valid = true;

    // Validate name
    if (!namePattern.test(user.name)) {
      setNameError("Uw naam moet alleen letters bevatten en mag niet langer dan 20 karakters zijn.");
      valid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!emailPattern.test(user.email)) {
      setEmailError("Voer een geldig emailadres in.");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!passwordPattern.test(user.password)) {
      setPasswordError(
        "Wachtwoord moet 8-16 tekens lang zijn, en minstens één hoofdletter, kleine letter en cijfer bevatten."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    // If all validations pass
    if (valid) {
      // Here you would typically send the updated user data to the server
      alert("Profiel opgeslagen!");
      setEditMode(false);
      setShowPassword(false); // Hide password after saving
    }
  };

  return (
    <>
      <Header />
<<<<<<< Updated upstream

      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        {token ? (
          <div className="flex justify-between">
            <div className="w-2/3">
              {/* Name */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Naam</label>
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                    {nameError && (
                      <p className="text-red-500 text-sm mt-1">{nameError}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-gray-900">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Email</label>
                {editMode ? (
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-gray-900">{user.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4 relative">
                <label className="block font-medium text-gray-700">Wachtwoord</label>
                {editMode ? (
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-gray-900">*****</p> // Always hide password when not editing
                )}
              </div>

              {/* Buttons */}
              {editMode ? (
                <button
                  className="mt-6 px-4 py-2 bg-prim-green text-white font-semibold rounded-lg hover:bg-tert-blue"
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  className="mt-6 px-4 py-2 bg-prim-green text-white font-semibold rounded-lg hover:bg-tert-blue"
                  onClick={toggleEditMode}
                >
                  Pas profiel aan
                </button>
              )}
            </div>

            {/* Right side: Upload Image */}
            <div className="w-2/3 bg-gray-100 shadow-lg p-4 rounded-lg">
              <div className="flex flex-col items-center">
                {!image && (
                  <h2 className="text-xl font-bold m-24 p-4 border-2 solid border-neutral-700">
                    Upload Image
                  </h2>
                )}
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="House Preview"
                    className="mb-2 w-full h-auto object-cover rounded"
                  />
                )}
                <div>
=======
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        {token ? (
          <div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Name</label>
>>>>>>> Stashed changes
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    readOnly // Assuming role can't be changed
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Join Date</label>
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
                  <label className="block font-medium text-gray-700">Name</label>
                  <p className="text-lg text-gray-900">{user.name}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Email</label>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Role</label>
                  <p className="text-lg text-gray-900">{user.role}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-medium text-gray-700">Join Date</label>
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
