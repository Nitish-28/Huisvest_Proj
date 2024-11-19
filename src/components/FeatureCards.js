import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiBookmark } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";

export default function FeatureCard({ id, title, price, m2, type, city, size, text_size, bedrooms, bathrooms }) {

  const navigate = useNavigate();
  
  function clickedCard() {
    navigate(`/details/${id}`);
  }

  return (
    <div 
      onClick={clickedCard} 
      className="text-sm cursor-pointer rounded mb-2 mt-2 lg:flex shadow-lg bg-white shadow-md  hover:bg-[#efefef9d] hover:scale-105 transition-transform duration-200 transform"
    >
      <img 
        className="max-w-lg max-h-16 lg:max-h-24 object-cover" 
        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="Card image cap" 
      />
      <div className="px-6 py-4 w-4/5 flex justify-between items-center">
        {/* Left Side with Title and Views */}
        <div>
          <div className='flex space-x-1'>
          <h2 className="text-tert-blue font-bold font-roboto  mb-2">{title}</h2>
          
          </div>
          <div className='flex space-x-2'>
          <p className='text-gray-600'>{city}</p>
            <p className="text-gray-600 flex mr-2"><FaBed />{bedrooms}</p>
            <p className="text-gray-600 flex mr-2"><FaBath />{bathrooms}</p>
            <div className='text-gray-600 flex mr-2'>
            {m2} m2
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
