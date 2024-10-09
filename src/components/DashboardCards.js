import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HiBookmark } from "react-icons/hi";
export default function Card({ key, title, price, type }) {

  const navigate = useNavigate();
  
  function clickedCard() {
    navigate(`/details/${key}`);
  }

  return (
    <div onClick={clickedCard} className="rounded lg:flex overflow-hidden shadow-lg hover:scale-102 hover:bg-[#efefef9d] bg-white shadow-md">
      <img className=" max-w-lg max-h-12 lg:max-h-24 object-cover" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Card image cap" />
      <div className="px-6 py-4 w-4/5">
        <div class="h-25  grid-cols-2 gap-8 content-evenly ... lg:flex">
          <div>
            <h2 className="text-tert-blue font-bold font-roboto text-xl mb-2">{title}</h2>
            <h3>{type}</h3>
          </div>
          <div>127 m²</div>
          <div>€{price}</div>
        </div>
        <div className="flex justify-end ">
        </div>
      </div>

    </div>

  );
}