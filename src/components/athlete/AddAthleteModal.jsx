/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

const AddAthleteModal = ({ onClick, handleAiModal }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[515px]  ">
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">Add Athlete</p>
          <div
            className="flex justify-between items-center pb-2 "
            onClick={onClick}
          >
            <span className="cursor-pointer rounded-sm p-[2px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 font-light text-gray-400 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="mt-4 flex gap-4 w-full h-[200px]">
          <button
            onClick={() => navigate("/app/add-athlete")}
            className="flex flex-col items-center justify-center bg-[#EAEEF8] text-black py-2 px-4 rounded-lg font-semibold w-full transition-all duration-300 ease-in-out hover:bg-[#0085CA] hover:text-white"
          >
            <span className="mr-2">🏃‍♂️</span> Add Manually
          </button>
          <button
            onClick={handleAiModal}
            className="flex flex-col items-center justify-center bg-[#EAEEF8] text-black py-2 px-4 rounded-lg font-semibold w-full transition-all duration-300 ease-in-out hover:bg-gradient-to-b from-pink-300 hover:to-indigo-600 hover:text-white"
          >
            <span className="mr-2">✨</span> Use AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAthleteModal;
