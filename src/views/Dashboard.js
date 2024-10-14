import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React, { useState } from "react";
import MyHouses from "../components/MyHouses";
import HouseListing from "../components/HouseListing";
import OutgoingBiddings from "../components/OutgoingBiddings";
import Profile from "../components/Profile";

const navigation = [
  { name: "My houses" },
  { name: "House Listing" },
  { name: "Outgoing Biddings" },
  { name: "Profile" },
];

export default function Dashboard() {
  const [page, setPage] = useState("My houses");

  function changePage(value) {
    setPage(value);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="min-h-full">
      <Header />
      <nav className="bg-[#5caf84]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => changePage(item.name)}
                      className="text-white hover:bg-[#4DB2B0] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="p-4 bg-white shadow rounded-md">
            {page === "My houses" && <MyHouses />}
            {page === "House Listing" && <HouseListing />}
            {page === "Outgoing Biddings" && <OutgoingBiddings />}
            {page === "Profile" && <Profile />}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
