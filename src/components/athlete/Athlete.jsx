import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiPlus, FiX } from "react-icons/fi";

export default function Athlete() {
  const [activeTab, setActiveTab] = useState("Athlete");
  // State for Family tab (Siblings)
  const [siblings, setSiblings] = useState([{ id: 1, type: 'Sister' }, { id: 2, type: 'Brother' }]);

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      
      {/* Main Form Content */}
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        {/* --- ATHLETE TAB CONTENT --- */}
        {activeTab === "Athlete" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
            
            {/* Athletic Background */}
            <section className="space-y-4">
              <h3 className="font-bold text-gray-800">Athletic Background</h3>
              <InputField label="Other Sports" placeholder="Enter name" fullWidth />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <InputField label="Activities" placeholder="Activities here" />
                <InputField label="Coach Evaluation" placeholder="Evaluation here" />
              </div>
            </section>

            {/* Football Character */}
            <section className="space-y-4">
              <h3 className="font-bold text-gray-800">Football Character</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 items-end">
                <div className="md:col-span-1">
                  <InputField label="Pi Score" placeholder="Score here" />
                </div>
                <div className="md:col-span-3">
                  <InputField label="Description" placeholder="Description here" />
                </div>
              </div>
            </section>

            {/* Personal Character */}
            <section className="space-y-4">
              <h3 className="font-bold text-gray-800">Personal Character</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 items-end">
                <div className="md:col-span-1">
                  <InputField label="Pi Score" placeholder="Score here" />
                </div>
                <div className="md:col-span-3">
                  <InputField label="Description" placeholder="Description here" />
                </div>
              </div>
            </section>

            {/* Other Relevant Information */}
            <section className="space-y-2">
              <label className="font-bold text-gray-800">Other Relevant Information</label>
              <textarea 
                className="w-full h-32 p-4 bg-white rounded-2xl border border-gray-50 outline-none placeholder:text-gray-300 text-sm shadow-sm focus:ring-1 focus:ring-blue-100 transition-all"
                placeholder="Coach Quote here"
              />
            </section>
          </div>
        )}

        {/* --- PLACEHOLDERS FOR OTHER TABS --- */}
        {activeTab !== "Athlete" && (
            <div className="flex items-center justify-center h-full text-gray-400">
                Content for {activeTab} coming soon...
            </div>
        )}

        {/* Footer Actions */}
        
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder, fullWidth = false }) => (
  <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
    <div className="bg-white rounded-xl px-4 py-3 border border-gray-50 shadow-sm focus-within:ring-1 focus-within:ring-blue-100 transition-all">
          <label className="text-xs text-gray-400 ml-1">{label}</label>

      <input 
        className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300" 
        placeholder={placeholder} 
      />
    </div>
  </div>
);