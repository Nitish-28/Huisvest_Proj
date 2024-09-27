import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Card from "../components/Card";
import Filter from "../components/Filter";
import React, { useState, useCallback, useEffect, } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]); // Decode and return the cookie value
      }
  }
  return null; // Return null if the cookie is not found
}

export default function Home() {

  // fetch data en zet in state!
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  // State to hold email and password
  const email = "admin@gmail.com"; // Replace with actual email
  const password = "password";   // Replace with actual password

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://api.chrisouboter.com/api/content`,
        });
        setApiData(response.data.data);
        toast.info('Test notificatie (data is geladen})', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } catch (err) {
        setError(err);
        toast.warning(err, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />

      <div className="flex relative bg-[#dddddd46] sm:pb-32 p-2 w-full">
        
        <div className="flex flex-col items-center lg:w-4/4 w-full">
          <div className="bg-white shadow-md p-2 rounded-md w-full max-w-xs mb-4">
            <label htmlFor="postcode" className="block text-sm font-medium leading-6 text-gray-900">Postcode</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="postcode"
                id="postcode"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="1234AB"
              />
              <button className="btn btn-outline btn-success">Success</button>
            </div>
          </div>

          <div className="flex">
            <div className="lg:w-1/4 w-full p-1 self-start">
              <Filter />
            </div>

            <div className="flex flex-col items-center lg:w-3/4 w-full">
              <div className="mx-auto grid gap-x-2 p-4 gap-y-10 w-full bg-white shadow-lg">

                {/* Als API nog geen reactie heeft gegeven, 
                laat een spinner zien. */}

                { !apiData.length ? (
                  <div className="flex justify-center items-center h-64 gap-x-8 gap-y-12">
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>
                 
                  ) : (
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-y-16">
                    {apiData.map(card => (
                      <Card 
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
