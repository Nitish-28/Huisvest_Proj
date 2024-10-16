import { useState, useEffect } from "react";
import axios from "axios";
import { HiBell, HiUser } from "react-icons/hi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MainLogo from "./MainLogo";
import { useToken } from "../ctx/TokenContext";
import ApiConnection from "../components/ApiConnection";
import { Dialog } from "@headlessui/react"; // Added import for Dialog

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, logout } = useToken();
  const [notifications, setNotifications] = useState([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <div className="flex lg:flex-1 flex-2">
          <a href="/home" className="p-2">
            <MainLogo text={true} />
          </a>
        </div>
        <a href="/dashboard" className="p-2 text-sm">
          Dashboard
        </a>

        {/* Right section: Notifications and User Menus */}
        <div className="hidden relative lg:flex lg:flex-1 lg:justify-end space-x-4">
          {token ? (
            <>
              {/* Options Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  id="options-dropdown-button"
                  onClick={toggleOptionsMenu}
                  className="flex items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  <HiUser className="h-5 w-5 text-white" />
                </button>

                {isOptionsOpen && (
                  <div
                    id="options-dropdown"
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Profile
                      </a>
                    </div>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Outgoing biddings
                      </a>
                    </div>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  id="notifications-dropdown-button"
                  onClick={toggleNotificationsMenu}
                  className="flex items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  <HiBell className="h-6 w-6" />
                </button>

                {isNotificationsOpen && (
                  <div
                    id="notifications-dropdown"
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50"
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-gray-700">Notifications</h3>
                      <ul className="mt-2">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <li
                              key={notification.id}
                              className={`py-2 text-sm p-2 border-b border-gray-200 text-black last:border-0 ${
                                notification.read ? "" : "bg-blue-200"
                              }`}
                            >
                              {notification.message}
                            </li>
                          ))
                        ) : (
                          <li className="py-2 text-gray-500">
                            No new notifications
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <a
              href="/login"
              className="flex items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" className="h-8 w-auto" />
            </a>
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
