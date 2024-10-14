import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogPanel, Popover } from "@headlessui/react";
import {
  HiBell,
  HiUser,
  // Add XMarkIcon to the import statement
} from "react-icons/hi";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Import XMarkIcon here
import MainLogo from "./MainLogo";
import { useToken } from "../ctx/TokenContext";
import ApiConnection from "../components/ApiConnection";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { token, logout } = useToken();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        // Make sure token is available before making the request
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
        <div className="hidden relative lg:flex lg:flex-1 lg:justify-end space-x-4">
          {token ? (
            <>
              {/* Notification Popover */}
              <Popover className="relative" style={{ zIndex: 1500 }}>
                <Popover.Button className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105">
                  <HiBell className="size-6" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50" >
                  <div className="p-4" >
                    <h3 className="font-bold text-gray-700">Notifications</h3>
                    <ul className="mt-2">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className={`py-2 text-sm  p-2 border-b border-gray-200 text-black last:border-0 ${notification.read ? "" : "bg-blue-200"}`}
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
                </Popover.Panel>
              </Popover>

              {/* User Popover */}
              <Popover className="relative"  style={{ zIndex: 1500 }}>
                <Popover.Button className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105">
                  <HiUser className="size-6" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-bold text-gray-700">User Settings</h3>
                    <ul className="mt-2">
                    <button
                      className="flex my-2 text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 hover:bg-prim-green  text-black text-center p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                    >
                      Profile 
                    </button>
                      <button
                      className="flex my-2 text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 hover:bg-prim-green text-black text-center p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                    >
                      Settings
                    </button>
                      <button
                      onClick={logout}
                      className="flex my-2 text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 hover:bg-prim-green text-black  text-center p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                    >
                      Log out <span aria-hidden="true">&rarr;</span>
                    </button>{" "}
                    </ul>
                  </div>
                </Popover.Panel>
              </Popover>

              {/* Logout Button */}
              
            </>
          ) : (
            <a
              href="/login"
              className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
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
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
        </DialogPanel>
      </Dialog>
    </header>
  );
}
