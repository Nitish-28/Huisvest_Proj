import React, { useState } from 'react';
import Header from "../components/Header";
import { useToken } from "../ctx/TokenContext";

export default function Profile() {
  const { token } = useToken();
  const [image, setImage] = useState(null);

  // Simulate user data for the profile
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "User",
    joinDate: "January 10, 2022",
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

      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
        
        {token ? (
          <>
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

            <div className="w-1/3 mr-12">
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

            <button
              className="mt-6 px-4 py-2 bg-prim-green text-white font-semibold rounded-lg hover:bg-tert-blue"
              onClick={() => alert("Profile Edit Coming Soon!")}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <p className="text-gray-500">Please log in to view your profile.</p>
        )}
      </div>
    </>
  );
}
