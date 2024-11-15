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
import ApiConnection from "../components/ApiConnection";
import SkeletonCard from "../components/SkeletonCard";
import { useToken } from "../ctx/TokenContext";
import { useSavedHouses } from "../hooks/useSavedHouses";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  // SCROLL FUNCTIONS
  const savedHouses = useSavedHouses();
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, logout } = useToken();
  // fetch data en zet in state!
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const [totalPages, setTotalPages] = useState();

  // FILTER SHIT:
  const [filterCurrentType, setFilterCurrentType] = useState("All");
  const [filterCurrentAvailability, setCurrentAvailability] = useState("1");
  const [maxPrice, setMaxPrice] = useState(2500000);
  const [minPrice, setMinPrice] = useState(50000);

  const [searchTerms, setSearchTerms] = useState("");
  const [mobileFilterToggle, setMobileFilterToggle] = useState(false);
  const [sort, setSort] = useState("up");

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 200;
      setIsScrolled(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const toggleMobileFilter = () => {
    setMobileFilterToggle(!mobileFilterToggle);
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    filterCurrentType,
    filterCurrentAvailability,
    maxPrice,
    minPrice,
    sort,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchData = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("Fetching data: " + currentPage);
    setLoading(true);
    console.log("Loading data..");
    try {
      const response = await axios.get(`${ApiConnection()}/api/content`, {
        params: {
          page: currentPage,
          type: filterCurrentType,
          availability: filterCurrentAvailability,
          price_max: maxPrice,
          price_min: minPrice,
          search: searchTerms,
          sort: sort,
        },
      });
      setApiData(response.data.data);
      setTotalResults(response.data.total);
      setTotalPages(response.data.last_page);
      if (response.data.last_page < currentPage) {
        console.log("DEV: Last page less than current. Setting page to 1");
        setCurrentPage(1);
      }
      console.log("Data is ready..");
      setLoading(false);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <Header />

      {mobileFilterToggle ? (
        <div className="m-4 h-full">
          <button
            onClick={toggleMobileFilter}
            className="block rounded-md border-0 py-2 pl-3 pr-6 mr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            Close
          </button>
          <Filter
            setType={setFilterCurrentType}
            setAvailability={setCurrentAvailability}
            setMaxPrice={setMaxPrice}
            type={filterCurrentType}
            availability={filterCurrentAvailability}
            maxPrice={maxPrice}
            setSort={setSort}
            sort={sort}
            setMinPrice={setMinPrice}
            minPrice={minPrice}
          />
        </div>
      ) : (
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
                    <a
                      href="/home"
                      className="hidden sm:block justify-start mx-2"
                    >
                      <MainLogo text={false} />
                    </a>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={toggleMobileFilter}
                    className="lg:hidden block rounded-md border-0 py-2 pl-3 pr-6 mr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    Filters
                  </button>

                  <input
                    type="text"
                    name="postcode"
                    id="postcode"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        fetchData();
                      }
                    }}
                    className="block w-full ease-in-out rounded-md border-0 py-1.5 pl-3 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Zoek op Huisvest.."
                  />

                  <button
                    onClick={fetchData}
                    className="absolute inset-y-2 gap-1 right-2 flex items-center font-semibold leading-6 text-tert-blue hover:text-tert-blue-hover duration-300 ease-in-out"
                  >
                    {" "}
                    <FaSearch />
                    <p className="my-2">Zoeken</p>
                  </button>
                </div>
                <button
                  onClick={scrollUp}
                  className={` ${
                    isScrolled ? "" : "hidden"
                  } block h-9 rounded-md border-0 mx-4 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                >
                  <HiOutlineChevronUp />
                </button>
              </div>

              <div className="flex w-5/6 ">
                <div className="lg:block hidden lg:w-1/4 w-full self-start  sticky top-28 py-2 pr-4">
                  <Filter
                    setType={setFilterCurrentType}
                    setAvailability={setCurrentAvailability}
                    setMaxPrice={setMaxPrice}
                    type={filterCurrentType}
                    availability={filterCurrentAvailability}
                    maxPrice={maxPrice}
                    setSort={setSort}
                    sort={sort}
                    setMinPrice={setMinPrice}
                    minPrice={minPrice}
                  />
                </div>

                <div className="flex-col items-center lg:w-3/4 w-full  py-4">
                  {totalResults ? (
                    <>
                      <p className="text-xs text-gray-400 my-2">
                        {" "}
                        <b>{totalResults} </b>Resultaten gevonden op{" "}
                        <b>{totalPages}</b> pagina(s)
                      </p>

                      {/* Pagination */}
                      <Paginator
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        totalPages={totalPages}
                      />
                      {/* Pagination */}
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="mx-auto grid gap-x-2 p-4 gap-y-10 w-full bg-main-white shadow-lg z-10">
                    {/* Als API nog geen reactie heeft gegeven, 
                laat een spinner zien. */}
                    
                    {loading ? (
                      <ul
                        role="list"
                        className="grid gap-x-2 gap-y-2 sm:grid-cols-1 sm:gap-y-4"
                      >
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                      </ul>
                    ) : (
                      <ul
                        role="list"
                        className="grid gap-x-2 gap-y-2 sm:grid-cols-1 sm:gap-y-4"
                      >
                        {apiData.map((card, index) => (
                          <React.Fragment key={card.id}>
                            <Card
                              id={card.id}
                              type={card.type}
                              title={card.address}
                              price={card.price}
                              m2={card.m2}
                              bedrooms={card.bedrooms}
                              bathrooms={card.bathrooms}
                              city={card.city}
                              availability={card.availability}
                              created_at={card.created_at}
                              isSaved={savedHouses.includes(card.id)}
                            />

                            {(index + 1) % 3 === 0 && !token && (
                              <h1 className="p-4 bg-prim-green text-white">
                                <MainLogo /> Ontdek meer met een account{" "}
                                <u>
                                  <a href="/login">Log in</a>
                                </u>{" "}
                              </h1>
                            )}
                          </React.Fragment>
                        ))}
                      </ul>
                    )}
                    {totalResults && apiData.length >= 1 ? (
                      ""
                    ) : (
                      <h1>Oeps, geen resultaten gevonden</h1>
                    )}
                  </div>
                  {/* Pagination */}
                  {totalResults ? (
                    <>
                      {/* Pagination */}
                      <Paginator
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        totalPages={totalPages}
                      />
                      {/* Pagination */}
                    </>
                  ) : (
                    <></>
                  )}
                  {/* Pagination */}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
