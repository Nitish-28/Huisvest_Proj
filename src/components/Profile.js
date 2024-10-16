import React from 'react';
import { useToken } from "../ctx/TokenContext";

export default function Profile() {
  const { token } = useToken();

  // Simulate user data for the profile
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "User",
    joinDate: "January 10, 2022",
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
  );
}
