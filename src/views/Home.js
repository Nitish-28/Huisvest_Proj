import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";
import Filter from "../components/Filter";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { HiOutlineChevronUp } from "react-icons/hi";

import Paginator from "../components/Paginator";
import MainLogo from "../components/MainLogo";
import Spinner from "../components/Spinner";

export default function Home() {
  // SCROLL FUNCTIONS
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 200;
      setIsScrolled(window.scrollY > headerHeight);
      console.log(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // SCROLL FUNCTIONS

  // fetch data en zet in state!
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const [totalPages, setTotalPages] = useState();



  // FILTER SHIT:
  const [filterCurrentType, setFilterCurrentType] = useState("All");
  const [filterCurrentAvailability, setCurrentAvailability] = useState("All");

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    
    fetchData();
    
  }, [currentPage, filterCurrentType, filterCurrentAvailability]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchData = async () => {
    console.log("Fetching data: " + currentPage);
    setLoading(true);
    try {
      const response = await axios.get(`https://chrisouboter.com/api/content`, {
        params: {
          page: currentPage,
          type: filterCurrentType,
          availability: filterCurrentAvailability
        },
      });
      setApiData(response.data.data);
      setTotalResults(response.data.total)
      setTotalPages(response.data.last_page)
    
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <div className="flex relative bg-sec-white sm:pb-32 p-2 w-full">
          <div className="flex flex-col items-center lg:w-4/4 w-full z-100">
            {/* zoek ding */}

            <div
              className={`bg-main-white shadow-md rounded-md w-5/6 sticky top-4 p-4 flex justify-center items-center ${
                isScrolled ? "opacity" : ""
              }`}
              style={{ zIndex: 10 }}
            >
              <div
                className={`relative mt-1 rounded-md shadow-sm flex w-full max-w-lg content-center bg-red w-full `}
              >
                {isScrolled ? (
                  <a href="/home" className="justify-start mx-2">
                    <MainLogo />
                  </a>
                ) : (
                  ""
                )}
                <button className="lg:hidden block rounded-md border-0 py-2 pl-3 pr-6 mr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  Filters
                </button>
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
              <Filter setType={setFilterCurrentType} setAvailability={setCurrentAvailability} />
              </div>
              <div className="pagination"></div>

              <div className="flex-col items-center lg:w-3/4 w-full  py-4">
                { totalResults ? (
                  <>
              <p className="text-xs text-gray-400"> <b>{totalResults} </b>Resultaten op <b>{totalPages}</b> pagina(s)</p>

                  {/* Pagination */}
                <Paginator
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  totalPages={totalPages}
                />
                {/* Pagination */}
                  </>

                ) : (<></>)

                }

                
                <div className="mx-auto grid gap-x-2 p-4 gap-y-10 w-full bg-main-white shadow-lg z-10">
                  {/* Als API nog geen reactie heeft gegeven, 
                laat een spinner zien. */}

                  {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 gap-x-8 gap-y-2">
                      <span>Loading listings..</span>
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    </div>
                  ) : (
                    <ul
                      role="list"
                      className="grid gap-x-2 gap-y-2 sm:grid-cols-1 sm:gap-y-4"
                    >
                      {apiData.map((card) => (
                        <Card
                          type={card.type}
                          key={card.id}
                          title={card.address}
                          price={card.price}
                          // new:
                          city={card.city}
                          availability={card.availability}
                          created_at={card.created_at}
                        />
                      ))}
                    </ul>
                  )}
                </div>
                {/* Pagination */}
                <Paginator
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  totalPages={totalPages}
                />
                {/* Pagination */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
