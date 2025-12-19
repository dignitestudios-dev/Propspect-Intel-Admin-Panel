import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";

// Importing the individual form components
import BasicInfo from "../../components/athlete/BasicInfo";
import Family from "../../components/athlete/Family";
import Athlete from "../../components/athlete/Athlete";
import Overview from "../../components/athlete/Overview";
import Stats from "../../components/athlete/Stats";
import Education from "../../components/athlete/Education";
import Achievements from "../../components/athlete/Achievements";
import Media from "../../components/athlete/Media";

const TABS = [
  "Basic Info", "Family", "Athlete", "Overview", 
  "Stats", "Education", "Achievements", "Media"
];

export default function AthleteFormManager() {
  const [activeTab, setActiveTab] = useState("Basic Info");

  // Logic to determine which component to display
  const renderCurrentForm = () => {
    switch (activeTab) {
      case "Basic Info":   return <BasicInfo />;
      case "Family":       return <Family />;
      case "Athlete":      return <Athlete />;
      case "Overview":     return <Overview />;
      case "Stats":        return <Stats />;
      case "Education":    return <Education />;
      case "Achievements": return <Achievements />;
      case "Media":        return <Media />;
      default:             return <BasicInfo />;
    }
  };

  // Helper for navigation buttons
  const handleNext = () => {
    const currentIndex = TABS.indexOf(activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = TABS.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen p-2 font-sans">
      {/* Page Title & Back Button */}
      <div className="mb-6  mx-auto">
        <button className="flex items-center gap-2 text-gray-800 hover:text-black mb-2 font-bold text-lg">
          <FiArrowLeft size={18} />
          Add athlete
        </button>
        <p className="text-gray-500 text-sm ml-6">Create a comprehensive athlete profile with all relevant information</p>
      </div>
<div className="border-2 border-gray-200 p-4 rounded-xl">
      {/* Stepper Navigation Bar */}
      <div className="bg-[#E3E3E3] bg-opacity-10  rounded-2xl p-2 shadow-sm border border-white flex items-center justify-between mb-8 overflow-x-auto max-w-6xl mx-auto">
        {TABS.map((tab, index) => (
          <React.Fragment key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                ? " text-black font-extrabold" 
                : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
            {index < TABS.length - 1 && (
              <FiChevronRight className="text-gray-300 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
      

      {/* Dynamic Content Container */}
      <div className=" rounded-3xl  max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        <div className="flex-grow">
          {renderCurrentForm()}
        </div>
        </div>

        {/* Global Action Buttons */}
       
        
      </div>
       <div className="flex justify-center md:justify-end items-center gap-4 mt-12">
          <button className="px-10 py-3 rounded-xl font-semibold text-gray-700 bg-[#F1F5F9] hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          
          <button 
            disabled={activeTab === "Basic Info"}
            className={`px-10 py-3 rounded-xl font-semibold border border-gray-100 transition-colors ${
              activeTab === "Basic Info" ? "text-gray-200 bg-gray-50 cursor-not-allowed" : "text-gray-400 bg-white hover:bg-gray-50"
            }`}
            onClick={handlePrevious}
          >
            Previous
          </button>

          <button 
            className="px-14 py-3 rounded-xl font-semibold text-white bg-[#2D2D2D] hover:bg-black transition-colors"
            onClick={handleNext}
          >
            {activeTab === "Media" ? "Create Athlete" : "Next"}
          </button>
        </div>
    </div>
  );
}