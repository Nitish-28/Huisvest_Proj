import React from "react";

export default function SkeletonCard() {
  return (
    <div
      className={`rounded-md flex flex-col lg:flex-row overflow-hidden shadow-lg bg-white shadow-md cursor-pointer animate-pulse`}
    >
      <div className="w-full lg:w-72 h-48 bg-gray-30 animate-pulse" />
      <div className="px-6 py-4 w-full">
        <div className="flex mb-2">
          <div className="bg-gray-200 rounded-md text-gray-400 px-2 mr-2 text-xs w-12 h-4" />
          <div className="text-xs bg-gray-200 rounded-md font-bold text-gray-400 px-2 mr-2 h-4 w-32" />
        </div>

        <div className="h-25 grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-8 animate-pulse">
          <div className="flex flex-col">
            <div className="bg-gray-200 rounded-md h-6 w-3/4 mb-2" />
            <div className="bg-gray-200 rounded-md h-6 w-1/2" />
          </div>
          <div className="border-solid border-gray-200 py-2">
            <div className="bg-gray-200 rounded-md h-4 w-3/4 mb-1" />
            <div className="bg-gray-200 rounded-md h-4 w-1/2 mb-1" />
            <div className="bg-gray-200 rounded-md h-4 w-1/2 mb-1" />
            <div className="bg-gray-200 rounded-md h-4 w-1/2" />
          </div>
        </div>

        {/* Bookmark Button Placeholder */}
        <div className="absolute top-4 right-4">
          <div className="bg-gray-200 rounded-md h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
