import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Card from "../components/Card";
import Filter from "../components/Filter";
import React, { useState, useCallback, useEffect, } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineChevronUp } from "react-icons/hi";

export default function Home() {

  // SCROLL FUNCTIONS
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 200;
      setIsScrolled(window.scrollY > headerHeight);
      console.log(window.scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // SCROLL FUNCTIONS

  // fetch data en zet in state!
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);


  const fetchData = async () => {
    console.log("Fetching data: " + currentPage);
    setLoading(true);
    try {
      const response = await axios.get(`https://chrisouboter.com/api/content`, {
        params: {
          page: currentPage,
        },
      });
      setApiData(response.data.data);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > 100) {
      console.log(newPage);
      setCurrentPage(1);
      return;
    } 
    setCurrentPage(newPage);
  };

  return (
<div className="min-h-full">
      <Header />
      <main>
 <div className="flex relative bg-sec-white sm:pb-32 p-2 w-full">
  <div className="flex flex-col items-center lg:w-4/4 w-full">
    {/* zoek ding */}

    <div className={`bg-main-white shadow-md rounded-md w-5/6 sticky top-4 p-4 flex justify-center items-center ${isScrolled ? 'opacity' : ''}`}>
  <div className={`relative mt-1 rounded-md shadow-sm flex w-full max-w-lg content-center bg-red w-full `}>
    
      {isScrolled ? <a href="/home" className="justify-start mx-2">
            <span className="sr-only font-bold ">Huisvest</span>
            <div className="flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-center transition duration-300 ease-in-out transform hover:bg-tert-blue hover:scale-105">
              <div className="sm:mx-auto sm:w-24 sm:max-w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                  />
                </svg>
              </div>
              <div className="ml-3 text-xl">Huisvest</div>
            </div>
          </a> : ""}
          <button 
      className="lg:hidden block rounded-md border-0 py-2 pl-3 pr-6 mr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >Filters</button>
    <input
      type="text"
      name="postcode"
      id="postcode"
      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="Zoeken op ...."
    />
    <a
      href="#"
      className="absolute inset-y-0 right-3 flex items-center font-semibold leading-6 text-tert-blue hover:text-tert-blue-hover duration-300 ease-in-out"
    >
      Zoek
    </a>
  </div>
  <button
    onClick={scrollUp}
    className="block h-9 rounded-md border-0 mx-4 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <HiOutlineChevronUp />
  </button>
</div>
  

          <div className="flex w-5/6 ">
            <div className="hidden lg:block lg:w-1/4 w-full self-start  sticky top-28 py-4 pr-4">
              <Filter />
            </div>
            <div className="pagination">
            
</div>

            <div className="flex-col items-center lg:w-3/4 w-full  py-4">

            {/* Pagination */}
            <div className="p-4 bg-main-white flex shadow-md content-center">
                <button className="text-black mr-2" onClick={() => handlePageChange(currentPage - 1)}>prev</button>
                {Array.from({ length: 10 }, (_, index) => (
                
                <button 
                  key={index} 
                  onClick={() => handlePageChange(index + 1)} 
                  className={currentPage === index + 1 ? 'text-prim-green p-4 bg-slate-200 font-bold hover:bg-slate-400 hover:text-white' : 'p-4 hover:text-white hover:bg-slate-400'}
                >
                  {index + 1}
                </button>
              ))}
                <button className="text-black ml-2" onClick={() => handlePageChange(currentPage + 1)}>next</button>

              </div>
              {/* Pagination */}
            
              <div className="mx-auto grid gap-x-2 p-4 gap-y-10 w-full bg-main-white shadow-lg">

                {/* Als API nog geen reactie heeft gegeven, 
                laat een spinner zien. */}

                { !apiData.length ? (
                  <div className="flex flex-col justify-center items-center h-64 gap-x-8 gap-y-2">
                    <span>Loading listings..</span>
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>
                 
                  ) : (
                    <ul role="list" className="grid gap-x-2 gap-y-2 sm:grid-cols-1 sm:gap-y-4">
                    {apiData.map(card => (
                      <Card 
                      type={card.type}
                        key={card.id}
                        title={card.address}
                        price={card.price}
                      />
                    ))}
                    </ul>
                  )
                }

              </div>
                {/* Pagination */}
            <div className="p-4 bg-main-white flex shadow-md content-center">
                <button className="text-black mr-2" onClick={() => handlePageChange(currentPage - 1)}>prev</button>
                {Array.from({ length: 10 }, (_, index) => (
                
                <button 
                  key={index} 
                  onClick={() => handlePageChange(index + 1)} 
                  className={currentPage === index + 1 ? 'text-prim-green p-4 bg-slate-200 font-bold hover:bg-slate-400 hover:text-white' : 'p-4 hover:text-white hover:bg-slate-400'}
                >
                  {index + 1}
                </button>
              ))}
                <button className="text-black ml-2" onClick={() => handlePageChange(currentPage + 1)}>next</button>

              </div>
              {/* Pagination */}
            </div>
            
          </div>
        </div>
      </div>
      </main>
      </div>
  );
}
