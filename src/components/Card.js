import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card({ key, title, price, type }) {

  const navigate = useNavigate();
  
  function clickedCard() {
    navigate(`/details/${key}`);
  }

  return (
    <div onClick={clickedCard} className="rounded flex overflow-hidden shadow-lg hover:scale-105 bg-white shadow-md">
      <img className=" max-w-lg h-48 object-cover" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Card image cap" />
      <div className="px-6 py-4 w-4/5">
        <div class="h-25 grid grid-cols-2 gap-8 content-evenly ... flex">
          <div>
            <h2 className="text-tert-blue font-bold font-roboto text-xl mb-2">{title}</h2>
            <h3>{type}</h3>
          </div>
          <div>127 m²</div>
          <div>€{price}</div>
        </div>
        <div className="flex justify-end">
         <button className='bg-blue-50 p-2 rounded-mg'>Add to favorites</button>
        </div>
      </div>

    </div>

  );
}