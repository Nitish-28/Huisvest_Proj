import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card({ key, title, price }) {

  const navigate = useNavigate();
  
  function clickedCard() {
    navigate(`/details/${key}`);
  }

  return (
    <div onClick={clickedCard} className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 bg-white shadow-md">
      <img className="w-full h-48 object-cover" src="https://via.placeholder.com/480x240" alt="Card image cap" />
      <div className=" px-6 py-4">
        <div class="h-25 grid grid-cols-2 gap-8 content-evenly ...">
          <h2 className="font-roboto text-xl mb-2">{title} </h2>
          <div>m²</div>
          <div>€{price}</div>
        </div>
      </div>
    </div>

  );
}