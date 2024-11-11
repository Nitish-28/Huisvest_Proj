import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import MyHouses from "../components/MyHouses";
import HouseListing from "../components/HouseListing";
import OutgoingBiddings from "../components/OutgoingBiddings";
import axios from "axios";
import ApiConnection from "../components/ApiConnection";

export default function Dashboard() {
  const navigation = [
    { name: "My houses" },
    { name: "House Listing" },
    { name: "Outgoing Biddings" },
  ];
  const [totalViews, setTotalViews] = useState();
  const [page, setPage] = useState("DashboardHome");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const propertyResponse = await axios({
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          url: `${ApiConnection()}/api/user/totalviews`,
        });
        setTotalViews(propertyResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function changePage(value) {
    setPage(value);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="min-h-screen flex flex-col bg-sec-white">
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

      <main className="flex-grow bg-sec-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
          <div className="p-4 bg-main-white shadow rounded-md h-full">
            {page === "My houses" && <MyHouses totalViews={totalViews} />}
            {page === "House Listing" && <HouseListing />}
            {page === "Outgoing Biddings" && <OutgoingBiddings />}
            {page === "DashboardHome" && (
              <div className="min-h-full flex flex-col items-center">
                <h1 className="text-4xl mb-4 text-gray-800">Jouw Huisvest</h1>
                <div className="flex space-x-6">
                  <button onClick={() => changePage("My houses")} className="w-36 h-36 flex items-center justify-center text-center bg-white  p-4 hover:bg-gray-400 rounded-lg shadow-md font-semibold text-gray-700">
                    My houses
                  </button>
                  <button onClick={() => changePage("House Listing")} className="w-36 h-36 flex items-center justify-center text-center bg-white p-4 hover:bg-gray-400 rounded-lg shadow-md font-semibold text-gray-700">
                    House Listing
                  </button><button onClick={() => changePage("Outgoing Biddings")} className="w-36 h-36 flex items-center justify-center text-center bg-white  p-4 hover:bg-gray-400 rounded-lg shadow-md font-semibold text-gray-700">
                    Outgoing Biddings
                  </button>
                </div>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
