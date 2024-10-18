import { useState, useEffect } from "react";
import axios from "axios";
import { HiBell, HiUser } from "react-icons/hi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MainLogo from "./MainLogo";
import { useToken } from "../ctx/TokenContext";
import ApiConnection from "../components/ApiConnection";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, logout } = useToken();
  const [notifications, setNotifications] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Check for token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Set token in context if it exists
      // This assumes you have a way to set the token in your context
      // Example: setToken(storedToken);
    }
  }, []);

  // Toggle the options dropdown menu
  const toggleOptionsMenu = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  // Toggle the notifications dropdown menu
  const toggleNotificationsMenu = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Toggle the user settings dropdown menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = [
        "options-dropdown",
        "notifications-dropdown",
        "user-menu",
      ];
      dropdowns.forEach((dropdownId) => {
        const dropdownMenu = document.getElementById(dropdownId);
        const button = document.getElementById(`${dropdownId}-button`);

        if (
          dropdownMenu &&
          !dropdownMenu.contains(event.target) &&
          button &&
          !button.contains(event.target)
        ) {
          if (dropdownId === "options-dropdown") setIsOptionsOpen(false);
          if (dropdownId === "notifications-dropdown")
            setIsNotificationsOpen(false);
          if (dropdownId === "user-menu") setIsUserMenuOpen(false);
        }
      });
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  return (
    <header className="bg-prim-green sticky text-white text-xl z-50 shadow-lg">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 "
      >
        <div className="flex lg:flex-1 flex-2">
          <Link to="/home" className="p-2">
            <MainLogo text={true} />
          </Link>
        </div>

        {/* Right section: Notifications and User Menus */}
        <div className="hidden relative lg:flex lg:flex-1 lg:justify-end space-x-4">
          {token ? (
            <>
              {/* Notifications Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  id="notifications-dropdown-button"
                  onClick={toggleNotificationsMenu}
                  className="flex items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  <HiBell className="h-5 w-5 text-white" />
                </button>

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

              {/* Options Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  id="options-dropdown-button"
                  onClick={toggleOptionsMenu}
                  className="flex items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  <HiUser className="h-5 w-5 text-white" />
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
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/outgoingbiddings"
                      className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                    >
                      Outgoing Biddings
                    </Link>
                  </div>
                  <div className="py-2">
                    <a
                      onClick={logout}
                      href="#"
                      className="flex items-center w-full px-4 py-2 font-medium leading-6 text-black text-left transition-all duration-200 ease-in-out transform hover:scale-95 hover:bg-tert-blue hover:text-white rounded-md"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
