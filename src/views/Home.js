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

  // fetch data en zet in state!
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {

    

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `https://chrisouboter.com/api/content`,
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

    fetchData();
  }, []);

  const handleDataFetched = useCallback((data) => {
    setApiData(data.data);
    console.log(data.data);
  }, []);

  return (
    <div>
      <Header />

      <div className="flex relative bg-[#dddddd46] sm:pb-32 p-2 w-full">
  <div className="flex flex-col items-center lg:w-4/4 w-full ">
    {/* zoek ding */}

    <div className="bg-white shadow-md rounded-md w-5/6 sticky top-4 p-4 z-50 flex justify-center items-center">
  <div className="relative mt-1 rounded-md shadow-sm flex w-full max-w-lg content-center">
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

            <div className="flex flex-col items-center lg:w-3/4 w-full  py-4">
              <div className="mx-auto grid gap-x-2 p-4 gap-y-10 w-full bg-white shadow-lg">

                {/* Als API nog geen reactie heeft gegeven, 
                laat een spinner zien. */}

                { !apiData.length ? (
                  <div className="flex justify-center items-center h-64 gap-x-8 gap-y-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
