import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiBookmark } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import MoneyFormat from "./MoneyFormat";
import { formatDistanceToNow } from "date-fns";
import ApiConnection from "../components/ApiConnection";

export default function Card({
  id,
  title,
  price,
  type,
  availability,
  m2,
  bedrooms,
  bathrooms,
  created_at,
  isSaved,
  refresh,
}) {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  const [saved, setSaved] = useState(isSaved);
  const [animation, setAnimation] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleToggleLike = async (event) => {
    event.stopPropagation();

    try {
      setSaved((prevSaved) => !prevSaved);
      setAnimation(true);
      setTimeout(() => setAnimation(false), 300);

      if (saved) {
        await axios.post(
          `${ApiConnection()}/api/fav/remove/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `${ApiConnection()}/api/fav/save/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      refresh();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  function clickedCard() {
    navigate(`/details/${id}`);
  }

  return (
    <div
      onClick={clickedCard}
      className={`rounded-md flex flex-col lg:flex-row overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 transform hover:bg-[#efefef9d] bg-white shadow-md cursor-pointer ${
        availability ? "bg-red" : ""
      } relative`}
    >
      {type === "apartment" ? (
        <img
          className="w-full fill lg:w-72 sm:w- object-cover"
          src="https://images.pexels.com/photos/565324/pexels-photo-565324.jpeg"
          alt="Afbeelding van kaart"
        />
      ) : (
        <img
          className="w-full fill lg:w-72 object-cover"
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Afbeelding van kaart"
        />
      )}

      <div className="px-6 py-4 w-full">
        <div className="flex">
          <h3 className="text-gray-600">
            {availability ? (
              ""
            ) : (
              <div className="bg-red-200 font-bold rounded-md text-red-400 px-2 mr-2 text-xs w-12">
                Verkocht
              </div>
            )}
          </h3>
          <div className="text-xs bg-gray-200 rounded-md font-bold text-gray px-2 mr-2 text-xs w-auto text-gray-400">
            Gepubliceerd {timeAgo}
          </div>
        </div>
        <div className="h-25 grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-8">
          <div>
            <h2 className="text-tert-blue font-bold font-roboto text-xl ">
              {title}
            </h2>
            <p className="text-gray-600">
              <MoneyFormat amount={price} />
            </p>
          </div>
          <div className="border-solid border-gray-200 py-2">
            <div className="text-gray-600">
              {type === "apartment" ? "Appartement" : "Huis"}
            </div>
            <div className="text-gray-600">
              <b>{m2}</b> m²
            </div>
            <div className="text-gray-600">
              <b>{bedrooms}</b> Slaapkamer(s)
            </div>
            <div className="text-gray-600">
              <b>{bathrooms}</b> Badkamer(s)
            </div>
          </div>
        </div>

        {token ? (
          <div className="absolute top-4 right-4">
            <button
              onClick={handleToggleLike}
              className={`bg-sec-white p-2 rounded-md w-full transform transition-transform duration-300 ${
                animation ? "scale-125" : ""
              }`}
            >
              {saved ? (
                <HiBookmark className="w-6 h-6" />
              ) : (
                <CiBookmark className="w-6 h-6" />
              )}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
