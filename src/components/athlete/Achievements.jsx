import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";

export default function Achievements() {
  const [activeTab, setActiveTab] = useState("Achievements");
  
  // State to manage dynamic achievement list
  const [achievements, setAchievements] = useState([
    { id: 1, name: "", description: "" }
  ]);

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  const addAchievement = () => {
    const nextId = achievements.length > 0 ? Math.max(...achievements.map(a => a.id)) + 1 : 1;
    setAchievements([{ id: nextId, name: "", description: "" }, ...achievements]);
  };

  const removeAchievement = (id) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen  font-sans">
      {/* Header */}
     

      {/* Main Form Content */}
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        {activeTab === "Achievements" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Add Achievements</h3>
              <button 
                onClick={addAchievement}
                className="px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                Add Achievement
              </button>
            </div>

            {/* Achievements List */}
            <div className="space-y-6">
              {achievements.map((ach) => (
                <div key={ach.id} className=" p-6 rounded-2xl border-2 border-gray-200 relative">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-600">Achievements {ach.id}</h4>
                    <button 
                      onClick={() => removeAchievement(ach.id)}
                      className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <InputField label="Achievement Name" placeholder="Enter Achievement Name" />
                    
                    <div className="flex flex-col gap-2">
                      {/* <label className="text-xs text-gray-400 ml-1">Description</label> */}
                      <div className="relative bg-white rounded-xl border border-gray-50 shadow-sm">
                        <textarea 
                          className="w-full h-32 p-4 outline-none text-sm text-gray-700 placeholder:text-gray-300 resize-none rounded-xl"
                          placeholder="Description"
                          maxLength={1000}
                        />
                        <span className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-medium">
                          0/1000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder }) => (
  <div className="flex flex-col gap-2">
    <div className="bg-white rounded-xl px-4 py-3 border border-gray-50 shadow-sm">
          <label className="text-xs text-gray-400 ml-1">{label}</label>

      <input 
        className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300" 
        placeholder={placeholder} 
      />
    </div>
  </div>
);