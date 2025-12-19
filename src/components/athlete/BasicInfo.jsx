import React, { useState } from "react";
import { FiArrowLeft, FiEdit2, FiChevronRight, FiChevronDown } from "react-icons/fi";

export default function BasicInfo() {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [position, setPosition] = useState("Point Guard");
  const [status, setStatus] = useState("Rookie");

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  const positions = ["Point Guard", "Shooting Guard", "Small Forward", "Center", "Power Forward"];
  const statuses = ["Rookie", "Fresh Talent", "Emerging Star", "Prospect", "Debutant"];

  return (
    <div className="min-h-screen  font-sans">
      {/* Back Button & Title */}
      
      {/* Main Form Card */}
      <div className="   max-w-6xl mx-auto">
        
        {/* Profile Upload Circle */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-semibold text-gray-400 border border-gray-100 shadow-inner">
              U
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-gray-200 text-blue-400 shadow-sm">
              <FiEdit2 size={14} />
            </button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InputField label="Athlete Name" placeholder="Enter name" />
          <InputField label="Date of Birth" placeholder="Age here" />

          {/* Position Selector */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">Select Position</label>
            <div className="flex flex-wrap gap-3">
              {positions.map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    position === p 
                    ? "bg-[#0085CA] text-white border-[#0085CA]" 
                    : "bg-white text-gray-500 border-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <InputField label="Height (Ft)" placeholder="Enter height" />
          <InputField label="Weight (Lbs)" placeholder="Enter weight" />
          <InputField label="Hometown" placeholder="Select hometown" />
          <InputField label="Contact Email" placeholder="Enter email" />
          
         <div className="flex flex-col gap-2">
  <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
    <label className="block text-[10px] text-gray-400 mb-1">
      Phone Number
    </label>
    <div className="flex items-center">
      <span className="text-gray-900 font-medium mr-2 text-sm">+1</span>
      <input
        className="outline-none w-full text-sm placeholder:text-gray-300"
        placeholder="Enter number here"
      />
    </div>
  </div>
</div>


          <div className="flex flex-col gap-2">
  <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
    <label className="block text-[10px] text-gray-400 mb-1">
      Committed Team
    </label>
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">Select team</span>
      <FiChevronDown className="text-gray-400" />
    </div>
  </div>
</div>


          {/* Status Selector */}
          <div className="md:col-span-2 mt-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">Current Status</label>
            <div className="flex flex-wrap gap-3">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    status === s 
                    ? "bg-[#0085CA] text-white border-[#0085CA]" 
                    : "bg-white text-gray-500 border-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder }) => (
  <div className="flex flex-col gap-2">
    <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
            <label className="text-xs text-gray-400 ">{label}</label>

      <input 
        className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300" 
        placeholder={placeholder} 
      />
    </div>
  </div>
);