import React from "react";
import { useNavigate } from "react-router-dom";
import { HiBookmark } from "react-icons/hi";
import MoneyFormat from "./MoneyFormat";
import { formatDistanceToNow } from "date-fns";

export default function Card({
  key,
  title,
  price,
  type,
  availability,
  created_at,
}) {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  function clickedCard() {
    navigate(`/details/${key}`);
  }

  return (
    <div
      onClick={clickedCard}
      className={`rounded-md flex flex-col lg:flex-row overflow-hidden shadow-lg hover:scale-106 hover:bg-[#efefef9d] bg-white shadow-md cursor-pointer ${availability ? "bg-red" : ""} relative`} // Add relative class here
    >
      {type === "apartment" ? (
        <img
          className="w-full fill lg:w-72 sm:w- object-cover"
          src="https://images.pexels.com/photos/565324/pexels-photo-565324.jpeg"
          alt="Card image cap"
        />
      ) : (
        <img
          className="w-full fill lg:w-72 object-cover"
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Card image cap"
        />
      )}

      <div className="px-6 py-4 w-full">
        <div className="flex">
          <h3 className="text-gray-600">
            {availability ? (
              ""
            ) : (
              <div className="bg-red-200 font-bold rounded-md text-red-400 px-2 mr-2 text-xs w-12">
                Sold
              </div>
            )}
          </h3>
          <div className="text-xs bg-gray-200 rounded-md font-bold text-gray px-2 mr-2 text-xs w-auto text-gray-400">
            Listed {timeAgo}
          </div>
        </div>

        <div className="h-25 grid grid-cols-1 lg:grid-cols-1  gap-6 lg:gap-8">
          <div>
            <h2 className="text-tert-blue font-bold font-roboto text-xl ">
              {title}
            </h2>
            <MoneyFormat amount={price} />
          </div>
          <div className="border-solid border-gray-200 py-2">
          <div className="text-gray-600"></div>
          <div className="text-gray-600"></div>
          <div className="text-gray-600">{type}</div>
          <div className="text-gray-600"><b>116</b> m²</div>
          
          <div className="text-gray-600"><b>2</b> Bedrooms</div>
          <div className="text-gray-600"><b>1</b> Bathrooms</div>
          </div>
        
        </div>

        {/* Bookmark Button */}
        <div className="absolute top-4 right-4"> {/* Change to absolute positioning */}
          <button className="bg-blue-50 p-0 rounded-md">
            <HiBookmark className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
