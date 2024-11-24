import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiBookmark } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({ id, title, price, type, size, text_size, views, deleteHouse }) {

  const navigate = useNavigate();
  
  function clickedCard() {
    navigate(`/details/${id}`);
  }

  return (
    <div 
      onClick={clickedCard} 
      className="text-sm rounded mb-2 mt-2 lg:flex shadow-lg bg-white shadow-md  hover:bg-[#efefef9d] hover:scale-105 transition-transform duration-200 transform"
    >
      <img 
        className="max-w-lg max-h-16 lg:max-h-24 object-cover" 
        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="Card image cap" 
      />
      <div className="px-6 py-4 w-4/5 flex justify-between items-center">
        {/* Left Side with Title and Views */}
        <div>
          <div>
          <h2 className="text-tert-blue font-bold font-roboto mb-2">{title}</h2>
          <p className='flex items-center gap-2'><FaEye />{views}</p>
          </div>

        </div>
        
        {/* Right Side with Edit and Remove */}
        <div className="flex gap-2 items-center">
          <button
  onClick={() => deleteHouse(id)}
  className="text-red-500 hover:text-red-700 text-sm ml-4"
>
  <FontAwesomeIcon icon={faTrash} /> Verwijder
</button>
        </div>
      </div>
    </div>
  );
}
