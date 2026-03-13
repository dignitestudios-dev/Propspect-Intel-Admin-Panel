import React from 'react';
import { GoTrophy } from "react-icons/go";

const Achievements = ({ athlete }) => {
  if (!athlete || athlete.length === 0) {
    return <p className="text-gray-500 text-center">No achievements found</p>;
  }

  return (
    <div className="space-y-6">
      {athlete.map((achievement, index) => (
        <div
          key={index}
          className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <GoTrophy size={24} className="text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-900">{achievement?.title || "N/A"}</h2>
          </div>
          <p className="text-gray-700 text-sm">{achievement?.description || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default Achievements;