import React, { useState } from 'react';
import Header from "../components/Header";
import { useToken } from "../ctx/TokenContext";

export default function Profile() {
  const { token } = useToken();
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
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
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="p-2 border border-gray-300 rounded mb-4"
                  />
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="bg-tert-blue text-white py-2 px-4 rounded disabled:opacity-50 hover:bg-[#62e3e1] duration-300 ease-in-out transform"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Please log in to view your profile.</p>
        )}
      </div>
    </>
  );
}
