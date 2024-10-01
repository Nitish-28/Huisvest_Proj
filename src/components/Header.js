import { useState } from "react";
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
import { useToken } from "../ctx/TokenContext"

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token } = useToken();
  return (
    <header className="bg-prim-green sticky text-white text-xl">
      { token ? (<div className="bg-blue-50 text-red-400 px-4">DEV: Logged in, access token: <b>{ token }</b></div>) : (<div className="bg-blue-50 text-red-400 px-4">DEV: Not logged in</div>)} 
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 flex-2">
          <a href="/home" className="p-2">
            <span className="sr-only font-bold ">Huisvest</span>
            <div className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105">
              <div className="sm:mx-auto sm:w-24 sm:max-w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                  />
                </svg>
              </div>
              <div className="ml-3 text-xl">Huisvest</div>
            </div>
          </a>
        </div>

        <div className="flex lg:hidden ">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <a
          href="#"
          className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
        >
          Features
        </a>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12"></PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/dashboard"
            className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
          >
            Dashboard <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/Login"
            className="flex text-base items-center rounded-lg px-3 py-2 font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
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
              className="-m-2.5 rounded-md p-2.5 "
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3  font-semibold leading-7  hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  Company
                </a>
                
              </div>
              
              <div className="py-6">
                <a
                  href="/login"
                  className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-prim-green  text-center mb-4 p-4 transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105"
                >
                  Log in
                </a>
              </div>
              
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
