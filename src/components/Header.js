import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useToken } from "../ctx/TokenContext";
import { HiBell } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import MainLogo from "./MainLogo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, logout } = useToken();

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          url: "https://chrisouboter.com/api/notifications",
        });
        setNotifications(response.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <header className="bg-prim-green sticky text-white text-xl z-50 shadow-lg">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <div className="flex lg:flex-1 flex-2">
          <a href="/home" className="p-2">
            <MainLogo />
          </a>
        </div>

        <div className="hidden relative lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <>
              <Popover className="relative z-50">
                <Popover.Button className="flex text-base items-center rounded-lg px-3 py-2 font-semibold z-50 leading-7 bg-prim-green text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105">
                  <HiBell className="size-6" />
                </Popover.Button>
                <PopoverPanel className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-bold text-gray-700">Notifications</h3>
                    <ul className="mt-2 bg-red">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className="py-2 border-b border-gray-200  text-black last:border-0"
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
                </PopoverPanel>
              </Popover>

              <button
                onClick={logout}
                className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
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
