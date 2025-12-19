import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiChevronDown, FiTrash2 } from "react-icons/fi";

export default function Education() {
  const [activeTab, setActiveTab] = useState("Education");
  
  // State to manage multiple institutions
  const [institutions, setInstitutions] = useState([
    { id: 2, name: "", startYear: "", endYear: "", field: "", gpa: "" },
    { id: 1, name: "", startYear: "", endYear: "", field: "", gpa: "" }
  ]);

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  const addEducation = () => {
    const nextId = institutions.length > 0 ? Math.max(...institutions.map(i => i.id)) + 1 : 1;
    setInstitutions([{ id: nextId, name: "", startYear: "", endYear: "", field: "", gpa: "" }, ...institutions]);
  };

  const removeEducation = (id) => {
    setInstitutions(institutions.filter(inst => inst.id !== id));
  };

  return (
    <div className="min-h-screen  font-sans">
      {/* Header */}
      

      {/* Main Form Content */}
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        {activeTab === "Education" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Add Education</h3>
              <button 
                onClick={addEducation}
                className="px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                Add Education
              </button>
            </div>

            {/* Institutions List */}
            <div className="space-y-6">
              {institutions.map((inst) => (
                <div key={inst.id} className=" p-6 rounded-2xl border-2 border-gray-200 relative">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-600">Institution {inst.id}</h4>
                    <button 
                      onClick={() => removeEducation(inst.id)}
                      className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <InputField label="Institution Name" placeholder="Enter institution name" />
                    </div>
                    <SelectField label="Year Started" placeholder="Select Year" />
                    <SelectField label="Year Ended" placeholder="Select Year" />
                    
                    <div className="md:col-span-2">
                      <InputField label="Field Of Study" placeholder="Enter field of study" />
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="GPA" placeholder="Enter gpa" />
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
      
      {/* Label inside input */}
      <label className="block text-[10px] text-gray-400 mb-1">
        {label}
      </label>

      {/* Input */}
      <input
        className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300"
        placeholder={placeholder}
      />
    </div>
  </div>
);


const SelectField = ({ label, placeholder }) => (
  <div className="flex flex-col gap-2">
    <div className="bg-white rounded-xl px-4 py-3 border border-gray-50 shadow-sm">
      
      {/* Label inside select container */}
      <label className="block text-[10px] text-gray-400 mb-1">
        {label}
      </label>

      {/* Select-like container */}
      <div className="flex items-center justify-between cursor-pointer">
        <span className="text-gray-300 text-sm">{placeholder}</span>
        <FiChevronDown className="text-gray-400" />
      </div>
    </div>
  </div>
);

