import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import MyHouses from "../components/MyHouses";
import HouseListing from "../components/HouseListing";
import OutgoingBiddings from "../components/OutgoingBiddings";
import axios from "axios";
import ApiConnection from "../components/ApiConnection";
import { FaList } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoHammerSharp } from "react-icons/io5";
import useTokenValidating from "../hooks/useTokenValidating";

export default function Dashboard() {
const { isSeller } = useTokenValidating();

  const navigation = [
    { name: "My houses",
      component: <FaHouse />,
    },
    { name: "House Listing",
      component: <FaList />, },
    { name: "Outgoing Biddings",
      component: <IoHammerSharp />,
    },
  ];
  const [totalViews, setTotalViews] = useState();
  const [totalHouses, setTotalHouses] = useState();
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
        setTotalViews(propertyResponse.data.views);
        setTotalHouses(propertyResponse.data.houses);
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
      <nav className={`${isSeller ? "bg-sec-seller" : "bg-[#5caf84]"}`}>

    
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className=" flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <button
                    key={item.name}
                    onClick={() => changePage(item.name)}
                    className="flex items-center text-white transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-tert-blue rounded-md px-3 py-2 text-sm font-medium space-x-2"
                  >
                    {item.component}
                    <span>{item.name}</span>
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
            {page === "My houses" && <MyHouses totalViews={totalViews} totalHouses={totalHouses} />}
            {page === "House Listing" && <HouseListing />}
            {page === "Outgoing Biddings" && <OutgoingBiddings />}
            {page === "DashboardHome" && (
              <div className="min-h-full flex flex-col items-center">
              <h1 className="text-4xl mb-4 text-gray-800">Jouw Huisvest</h1>
              <div className="flex space-x-6">
                <button 
                  onClick={() => changePage("My houses")} 
                  className="w-48 h-48 hover:scale-105 transition-transform duration-200 transform h-36 flex flex-col items-center justify-center text-center bg-white p-4 hover:bg-gray-400 rounded-lg shadow-md font-semibold text-gray-700"
                >
                  <FaHouse size={40} className="mb-2" />
                  <p>Mijn huizen</p>
                </button>
                
                <button 
                  onClick={() => changePage("House Listing")} 
                  className="w-48 h-48 hover:scale-105 transition-transform duration-200 transform h-36 flex flex-col items-center justify-center text-center bg-white p-4 hover:bg-gray-400 rounded-lg shadow-md font-semibold text-gray-700"
                >
                  <FaList size={40} className="mb-2" />
                  <p>Huis Aanmelden</p>
                </button>
                
                <button 
                  onClick={() => changePage("Outgoing Biddings")} 
                  className="w-48 h-48 hover:scale-105 transition-transform duration-200 transform h-36 flex flex-col items-center justify-center text-center bg-white p-4 hover:bg-gray-400 rounded-lg shadow-md font-semibold text-gray-700"
                >
                  <IoHammerSharp size={60} className="mb-2" />
                  <p>Biedingen</p>
                </button>
              </div>
            </div>
            )}
            <Outlet />
          </div>
      </main>
    </div>
  );
}
