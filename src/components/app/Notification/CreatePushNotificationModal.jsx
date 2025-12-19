/* eslint-disable react/prop-types */

import { useState } from "react";

const CreatePushNotificationModal = ({ onClick }) => {
  const [activeTab, setActiveTab] = useState("new");
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[515px]  ">
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">
            Send Notification
          </p>
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
          {/* Tab Buttons */}
          <div className="flex justify-between items-center w-full gap-2">
            <button
              onClick={() => setActiveTab("new")}
              className={`w-full px-5 py-2.5 rounded-lg font-semibold transition-colors ${
                activeTab === "new"
                  ? "bg-[#0085CA] text-white hover:bg-[#0087cad4]"
                  : "bg-transparent border border-[#E3E3E3] text-[#302C2C]"
              }`}
            >
              New Notification
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`w-full px-5 py-2.5 rounded-lg font-semibold transition-colors ${
                activeTab === "user"
                  ? "bg-[#0085CA] text-white hover:bg-[#0087cad4]"
                  : "bg-transparent border border-[#E3E3E3] text-[#302C2C]"
              }`}
            >
              Specific User
            </button>
          </div>

          {/* Conditional Content */}
          <div className="w-full">
            {activeTab === "user" && (
              <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">
                <p className="text-sm text-[#302C2C] font-light">
                  Search For User
                </p>
                <input
                  type="text"
                  placeholder="Search User Here"
                  className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent "
                />
              </div>
            )}

            {/* Notification Title */}
            <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">
              <p className="text-sm text-[#302C2C] font-light">
                Notification Title
              </p>
              <input
                type="text"
                placeholder="Enter title here"
                className="w-full mt-2 px-1 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent"
              />
            </div>

            {/* Description */}
            <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full h-[120px]">
              <p className="text-sm text-[#302C2C] font-light">Description</p>
              <textarea
                placeholder="Enter description here"
                className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent h-[70px] resize-none"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full mt-4 gap-2">
            <button className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors">
              Send
            </button>
            <button className="w-full px-5 py-2.5 rounded-md text-[#302C2C] border-[1px] border-[#E3E3E3]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePushNotificationModal;
