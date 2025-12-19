

import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiPlus, FiX, FiMoreVertical } from "react-icons/fi";

export default function Overview() {
  const [activeTab, setActiveTab] = useState("Overview");

  // State for dynamic lists
  const [strengths, setStrengths] = useState([
    "Ut magnis ipsum odio nisl tincidunt",
    "Nisi pellentesque consectetur",
    "Nascetur vel in nunc",
    "Amet donec consectetur pretium"
  ]);

  const [weaknesses, setWeaknesses] = useState([
    "Ut magnis ipsum odio nisl tincidunt",
    "Nisi pellentesque consectetur",
    "Nascetur vel in nunc",
    "Amet donec consectetur pretium"
  ]);

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  // List management functions
  const addListItem = (list, setList) => setList([...list, ""]);
  const removeListItem = (index, list, setList) => setList(list.filter((_, i) => i !== index));
  const updateListItem = (index, value, list, setList) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  return (
    <div className="min-h-screen  font-sans">
      {/* Header */}
     
      {/* Main Form Content */}
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        {activeTab === "Overview" && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-400">
            
            {/* Strengths Section */}
            <section className="bg-white/40 p-6 rounded-2xl border border-white/50">
              <h3 className="font-bold text-gray-800 mb-6">Strengths</h3>
              <div className="space-y-4">
                {strengths.map((item, index) => (
                  <div key={`strength-${index}`} className="flex items-center gap-3">
                    <span className="text-gray-800 font-bold w-4">{index + 1}</span>
                    <div className="flex items-center flex-grow bg-white rounded-xl border border-gray-50 shadow-sm px-2">
                      <FiMoreVertical className="text-gray-300 cursor-grab" />
                      <input 
                        className="w-full p-3 outline-none text-sm text-gray-700"
                        value={item}
                        onChange={(e) => updateListItem(index, e.target.value, strengths, setStrengths)}
                        placeholder="Enter strength"
                      />
                    </div>
                    <button 
                      onClick={() => removeListItem(index, strengths, setStrengths)}
                      className="p-3 rounded-xl border border-gray-100 bg-white text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <FiX size={18} />
                    </button>
                    {index === strengths.length - 1 && (
                      <button 
                        onClick={() => addListItem(strengths, setStrengths)}
                        className="p-3 rounded-xl border border-gray-100 bg-white text-emerald-500 hover:bg-emerald-50 transition-colors"
                      >
                        <FiPlus size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Weaknesses Section */}
            <section className="bg-white/40 p-6 rounded-2xl border border-white/50">
              <h3 className="font-bold text-gray-800 mb-6">Weaknesses</h3>
              <div className="space-y-4">
                {weaknesses.map((item, index) => (
                  <div key={`weakness-${index}`} className="flex items-center gap-3">
                    <span className="text-gray-800 font-bold w-4">{index + 1}</span>
                    <div className="flex items-center flex-grow bg-white rounded-xl border border-gray-50 shadow-sm px-2">
                      <FiMoreVertical className="text-gray-300 cursor-grab" />
                      <input 
                        className="w-full p-3 outline-none text-sm text-gray-700"
                        value={item}
                        onChange={(e) => updateListItem(index, e.target.value, weaknesses, setWeaknesses)}
                        placeholder="Enter weakness"
                      />
                    </div>
                    <button 
                      onClick={() => removeListItem(index, weaknesses, setWeaknesses)}
                      className="p-3 rounded-xl border border-gray-100 bg-white text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <FiX size={18} />
                    </button>
                    {index === weaknesses.length - 1 && (
                      <button 
                        onClick={() => addListItem(weaknesses, setWeaknesses)}
                        className="p-3 rounded-xl border border-gray-100 bg-white text-emerald-500 hover:bg-emerald-50 transition-colors"
                      >
                        <FiPlus size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Footer Actions */}
       
      </div>
    </div>
  );
}