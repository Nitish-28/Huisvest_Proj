import React, { useState } from 'react';
import Header from "../components/Header";
import { useToken } from "../ctx/TokenContext";

export default function Profile() {
  const { token } = useToken();
  const [image, setImage] = useState(null);

  // Simulate user data for the profile
  const user = {
    name: "Name",
    email: "example@example.com",
    role: "User",
    Password: "*****",
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        {token ? (
          <div className="flex justify-between">
            <div className="w-2/3">
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
                <label className="block font-medium text-gray-700">Password</label>
                <p className="text-lg text-gray-900">{user.joinDate}</p>
              </div>

              <button
                className="mt-6 px-4 py-2 bg-prim-green text-white font-semibold rounded-lg hover:bg-tert-blue"
                onClick={() => alert("Profile Edit Coming Soon!")}
              >
                Edit Profile
              </button>
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

