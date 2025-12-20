/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

const AthleteAiModal = ({ onClick }) => {
  const navigate = useNavigate(false);
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[715px]  ">
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">Add Prompt</p>
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

        <div className="flex flex-col justify-center items-center lg:h-auto md:h-screen border-[1px] border-[#E3E3E3] rounded-xl p-2">
          <div className=" rounded-lg w-full h-[120px]">
            <textarea
              placeholder="Type Prompt here"
              className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent h-[70px] resize-none"
            ></textarea>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end items-center w-full mt-4 gap-2">
          <div className="w-full"></div>
          <button className="w-full px-5 py-2.5 rounded-md text-[#302C2C] border-[1px] border-[#E3E3E3]">
            Cancel
          </button>

          <button
            onClick={() => navigate("/app/add-athlete")}
            className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors"
          >
            Fill Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteAiModal;
