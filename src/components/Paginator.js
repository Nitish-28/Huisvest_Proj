import React from 'react';

export default function Paginator({ currentPage, handlePageChange, totalPages }) {
  return (
    <div className="p-4 bg-main-white flex shadow-md content-center">
     { currentPage !== 1 ? <button 
        className="text-black mr-2  hover:bg-slate-400 px-2" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        {`<`}
      </button> : ""

     }
      

      {Array.from({ length: totalPages }, (_, index) => (
        <button 
          key={index} 
          onClick={() => handlePageChange(index + 1)} 
          className={currentPage === index + 1 
            ? 'text-prim-green p-4 bg-slate-200 font-bold hover:bg-slate-400 hover:text-white' 
            : 'p-4 hover:text-white hover:bg-slate-400'}
        >
          {index + 1}
        </button>
      ))}
      { currentPage === totalPages ? (
        <></>
      ) : (<button 
        className="text-black ml-2  hover:bg-slate-400 px-2" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Adjust this condition based on your last page
      >
        {`>`}
      </button>)

      }
      
    </div> 
  );
}
