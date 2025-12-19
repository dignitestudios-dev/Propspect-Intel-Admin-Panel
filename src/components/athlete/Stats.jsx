import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiPlus, FiX, FiMoreVertical } from "react-icons/fi";

export default function Stats() {
  const [activeTab, setActiveTab] = useState("Stats");

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  return (
    <div className="min-h-screen  font-sans">
      {/* Header */}
     
      {/* Main Form Content */}
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        {activeTab === "Stats" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <h3 className="font-bold text-gray-800 text-lg">Add Career Stats</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="Touches" placeholder="Enter touches" />
              <InputField label="Successful Passes" placeholder="Enter passes" />
              
              <InputField 
                label="Pass Accuracy" 
                placeholder="Enter accuracy" 
                suffix="%" 
              />
              <InputField 
                label="Tackles Completed" 
                placeholder="Enter tackles" 
                suffix="%" 
              />
              
              <InputField label="Carries" placeholder="Enter carries" />
              <InputField label="Tries" placeholder="Enter tries" />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder, suffix = null }) => (
  <div className="flex flex-col gap-2">
    <div className="bg-white rounded-xl px-4 py-3 border border-gray-50 shadow-sm">
      
      {/* Label inside input */}
      <label className="block text-[10px] text-gray-400 mb-1">
        {label}
      </label>

      {/* Input row */}
      <div className="flex items-center">
        <input
          className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300"
          placeholder={placeholder}
        />
        {suffix && (
          <span className="text-gray-400 text-sm ml-2">
            {suffix}
          </span>
        )}
      </div>
    </div>
  </div>
);
