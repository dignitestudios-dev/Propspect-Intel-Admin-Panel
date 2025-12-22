import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiPlus, FiX } from "react-icons/fi";

export default function Family() {
  const [activeTab, setActiveTab] = useState("Family");
  const [siblings, setSiblings] = useState([
    { id: 1, type: "Sister" },
    { id: 2, type: "Brother" },
  ]);

  const tabs = [
    "Basic Info",
    "Family",
    "Athlete",
    "Overview",
    "Stats",
    "Education",
    "Achievements",
    "Media",
  ];

  const addSibling = () => {
    setSiblings([...siblings, { id: Date.now(), type: "Brother" }]);
  };

  const removeSibling = (id) => {
    setSiblings(siblings.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}

      {/* Main Form Content */}
      <div className="rounded-3xl max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        {activeTab === "Family" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Mother Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <InputField label="Mother" placeholder="Enter name" />
              <InputField label="Date of Birth" placeholder="Age here" />
              <InputField label="Occupation" placeholder="Enter occupation" />
              <InputField label="Contact" placeholder="Contact here" />
            </div>

            {/* Father Section */}
            <div className="w-full md:w-1/2 md:pr-4">
              <InputField label="Father" placeholder="Father Name" />
            </div>

            {/* Sibling Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Sibling</h3>
              {siblings.map((sibling, index) => (
                <div key={sibling.id} className="flex items-end gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-grow">
                    <InputField label={sibling.type} placeholder="Enter name" />
                    <InputField label="Date of Birth" placeholder="Age here" />
                  </div>

                  <div className="flex gap-2 mb-1">
                    {index === siblings.length - 1 ? (
                      <>
                        {" "}
                        <button
                          onClick={() => removeSibling(sibling.id)}
                          className="p-3 rounded-xl border border-gray-100 bg-white text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiX size={18} />
                        </button>
                        <button
                          onClick={addSibling}
                          className="p-3 rounded-xl border border-gray-100 bg-white text-green-500 hover:bg-green-50 transition-colors"
                        >
                          <FiPlus size={18} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => removeSibling(sibling.id)}
                        className="w-24 h-[70px] rounded-xl border-2 border-[#E3E3E3]  text-red-500 hover:bg-red-50 transition-colors flex justify-center items-center"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Influences */}
            <div className="space-y-2">
              <label className="font-bold text-gray-800">
                Key Influences (Coach)
              </label>
              <textarea
                className="w-full h-32 p-4 bg-white rounded-2xl border border-gray-50 outline-none placeholder:text-gray-300 text-sm shadow-sm"
                placeholder="Coach Quote here"
              />
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
