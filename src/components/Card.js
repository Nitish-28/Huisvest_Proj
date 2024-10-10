import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiBookmark } from 'react-icons/hi';
import MoneyFormat from './MoneyFormat';

export default function Card({ key, title, price, type }) {
  const navigate = useNavigate();

  function clickedCard() {
    navigate(`/details/${key}`);
  }

  return (
    <div 
      onClick={clickedCard} 
      className="rounded-md flex flex-col lg:flex-row overflow-hidden shadow-lg hover:scale-102 hover:bg-[#efefef9d] bg-white shadow-md cursor-pointer"
    >
      <img 
        className="w-full h-48 lg:w-72 object-cover" 
        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="Card image cap" 
      />
      <div className="px-6 py-4 w-full lg:w-4/5">
        <div className="h-25 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          <div>
            <h2 className="text-tert-blue font-bold font-roboto text-xl mb-2">{title}</h2>
            <h3 className="text-gray-600">{type}</h3>
          </div>
          <div className="text-gray-600">127 m²</div>
          <div className="text-gray-600"><MoneyFormat amount={price}/></div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-50 p-2 rounded-md">
            <HiBookmark className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
