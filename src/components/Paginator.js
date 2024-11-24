import React from 'react';

export default function Paginator({ currentPage, handlePageChange, totalPages }) {
  return (
    <div className="p-4 mt-2 bg-main-white flex rounded-md content-center border-solid border-2 border-prim-green border-opacity-20 mb-2">
     { currentPage !== 1 ? <button 
        className="text-gray-600 mr-2  hover:bg-slate-400 px-2" 
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
            : 'p-4 hover:text-white text-gray-600 hover:bg-slate-400'}
        >
          {index + 1}
        </button>
      ))}
      { currentPage === totalPages ? (
        <></>
      ) : (<button 
        className="text-gray-600 ml-2  hover:bg-slate-400 px-2" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Adjust this condition based on your last page
      >
        {`>`}
      </button>)

      }
      
    </div> 
  );
}
