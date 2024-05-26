import React from "react";
import { v4 as uuidv4 } from 'uuid';

function Loader({ repeat }) {
  return (
    <div
      role="status"
      className="space-y-2.5 animate-pulse mx-auto grid w-full max-w-[1300px] items-center my-5 px-8"
    >
      {Array.from({ length: repeat }).map(() => (
        <div key={uuidv4()}  >
          <div className="flex items-center w-full mb-2">
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full mb-2">
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[50%]"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[50%]"></div>
          </div>
          <div className="flex items-center w-ful mb-2">
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[33%]"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[33%]"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[33%]"></div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
