import React from 'react';
import { GoTrophy } from "react-icons/go";

const Media = () => {
  return (
    <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
      
      <h1 className="p-2 pb-4 pt-0 font-bold flex items-center gap-2">
        Image/Video
      </h1>               
      
      <div className="grid grid-cols-6 gap-6">
        {/* First Image */}
        <div className="flex flex-col items-center bg-[#FAF8F2] p-2 rounded-xl">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Achievement 1" 
            className="rounded-xl mb-2"
          />
          <p className="text-center text-black">img.png</p>
        </div>

        {/* Second Image */} 
        <div className="flex flex-col items-center bg-[#FAF8F2] p-2 rounded-xl">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Achievement 2" 
            className="rounded-xl mb-2"
          />
          <p className="text-center text-black">img.png</p>
        </div>
      </div>
    </div>
  );
}

export default Media;
