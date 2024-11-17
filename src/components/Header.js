import { useState, useEffect } from "react";
import axios from "axios";
import { HiBell, HiUser } from "react-icons/hi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MainLogo from "./MainLogo";
import { useToken } from "../ctx/TokenContext";
import ApiConnection from "../components/ApiConnection";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import Bids from "../views/Bids";
import Home from "../views/Home";
import useTokenValidating from "../hooks/useTokenValidating";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, logout } = useToken();
  const [notifications, setNotifications] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [image, setImage] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true); // New loading state
  const { isSeller } = useTokenValidating();
  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) return;
        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        if (response.data.user.profile_picture) {
          setImage(response.data.user.profile_picture);
        } else {
          setImage("storage/profile_pictures/default-avatar.png")
        }
        setUsername(response.data.user.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
         // Set loading to false once data is fetched
      }
    };
    fetchUserData();
  }, [token]);

  // Fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios({
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            url: `${ApiConnection()}/api/notifications`,
          });
          setNotifications(response.data);
        } catch (err) {
          console.error("Error fetching notifications:", err);
        }
      }
    };
    fetchData();
  }, [token]);

  // Toggle Options dropdown
  const toggleOptionsMenu = () => {
    setIsOptionsOpen(!isOptionsOpen);
    setIsNotificationsOpen(false)
  };

  // Toggle Notifications dropdown
  const toggleNotificationsMenu = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsOptionsOpen(false);

  };

  return (
    <header
      className={`${
        isSeller ? "bg-prim-seller" : "bg-prim-green"
      } sticky text-white text-xl z-50 shadow-lg`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/home" className="p-2 flex items-center justify-between gap-4">
            <MainLogo text={true} /> 
            {isSeller ? (<b>Verkoper</b>) : (<></>)} 
          </Link>
        </div>
  
        {/* Right section: Notifications and User Menus */}
        <div className="hidden relative lg:flex lg:flex-1 lg:justify-end space-x-4">
          {token ? (
            <>
            <Link
              to="/login"
              className={`flex gap-2 items-center rounded-lg px-3 py-2 font-semibold leading-7 ${
                isSeller ? "bg-prim-seller" : "bg-prim-green"
              } text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105`}
            >
             <CiBookmark />  Favorieten
             
            </Link>
              {/* Notifications Dropdown */}
           
  
              {/* Options/User Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  id="options-dropdown-button"
                  onClick={toggleOptionsMenu}
                  className={`flex items-center rounded-lg px-3 py-2 font-semibold leading-7 ${
                    isSeller ? "bg-prim-seller" : "bg-prim-green"
                  } text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105`}
                >
                  <div className="flex gap-2">
                    {loading ? (
                      <p className="w-20 h-4 bg-gray-400 animate-pulse rounded-md center flex items-center"></p>
                    ) : (
                      <p>{username}</p>
                    )}
                    {loading ? (
                      <div className="w-8 h-8 bg-gray-400 animate-pulse rounded-full"></div>
                    ) : (
                      <img
                        src={"http://127.0.0.1:8000/" + image}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </button>
  
                {/* Dropdown menu */}
                <div
                  id="options-dropdown"
                  className={`absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-300 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform overflow-hidden ${
                    isOptionsOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="py-2">
                    <Link
                      to="/home"
                      className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                    >
                      Home
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                    >
                      Profile
                    </Link>
                  </div>
                  <div>
                    {isSeller ? (
                      <Link
                        to="/dashboard"
                        className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/bids"
                        className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                      >
                        Outgoing Biddings
                      </Link>
                    )}
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative inline-block text-left">
                <button
                  id="notifications-dropdown-button"
                  onClick={toggleNotificationsMenu}
                  className={`flex items-center rounded-lg px-3 py-3 font-semibold leading-7 ${
                    isSeller ? "bg-prim-seller" : "bg-prim-green"
                  } text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105`}
                >
                  <HiBell className="h-6 w-6 text-white" />
                </button>
  

            
                {/* Notifications menu */}
                <div
                  id="notifications-dropdown"
                  className={`absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform ${
                    isNotificationsOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-2">
                    <h3 className="block px-4 py-2 text-sm font-semibold text-gray-700">
                      Notifications
                    </h3>
                  </div>
                  <div className="py-1 max-h-64 overflow-auto">
                    <ul>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className={`py-2 px-4 text-sm border-b border-gray-200 text-black last:border-0 ${
                              notification.read ? "" : "bg-blue-200"
                            }`}
                          >
                            {notification.message}
                          </li>
                        ))
                      ) : (
                        <li className="py-2 px-4 text-gray-500">
                          No new notifications
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex">
               <Link
              to="/login"
              className={`flex gap-2 items-center rounded-lg px-3 py-2 font-semibold leading-7 ${
                isSeller ? "bg-prim-seller" : "bg-prim-green"
              } text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105`}
            >
             <CiBookmark />  Favorieten
             
            </Link>
               <Link
              to="/login"
              className={`flex gap-2 items-center rounded-lg px-3 py-2 font-semibold leading-7 ${
                isSeller ? "bg-prim-seller" : "bg-prim-green"
              } text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105`}
            >
             <FaRegUserCircle />  Inloggen
             
            </Link>
           
            </div>
           
            
          )}
        </div>
      </nav>
    </header>
  );
  
}
