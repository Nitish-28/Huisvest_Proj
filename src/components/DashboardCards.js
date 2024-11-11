import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiBookmark } from "react-icons/hi";

export default function Card({ id, title, price, type, size, text_size, views }) {

  const navigate = useNavigate();
  
  function clickedCard() {
    navigate(`/details/${id}`);
  }

  return (
    <div onClick={clickedCard} className="text-sm rounded m-2 lg:flex overflow-hidden shadow-lg hover:scale-102 hover:bg-[#efefef9d] bg-white shadow-md">
      <img className="max-w-lg max-h-16 lg:max-h-24 object-cover" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Card image cap" />
      <div className="px-6 py-4 w-4/5 flex justify-between items-center">
        {/* Left Side with Title and Views */}
        <div>
          <h2 className="text-tert-blue font-bold font-roboto mb-2">{title}</h2>
          <p>Views: {views}</p>
        </div>
        
        {/* Right Side with Edit and Remove */}
        <div className="flex gap-2 items-center">
          <div>Edit</div>
          <div>Remove</div>
        </div>
      </div>
    </div>
  );
}
