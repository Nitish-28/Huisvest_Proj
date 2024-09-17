import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card({ cardId, txt }) {

    const navigate = useNavigate();
    function clickedCard() {
      console.log("dev: clicked on card.");
      navigate(`/details/${cardId}`);
    }

    return (
        <div onClick={clickedCard} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src="https://via.placeholder.com/480x240" alt="Card image cap" />
        <div className="bg-[#629D73] px-6 py-4">
          <h2 className="font-bold text-xl mb-2">Card Title</h2>
          <p className=" text-base">
          { txt }
          </p>
        </div>
      </div>
      
    );
}