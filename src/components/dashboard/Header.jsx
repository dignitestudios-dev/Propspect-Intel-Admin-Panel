import React, { useState } from "react";

export default function Header() {
  const [active, setActive] = useState("7d");
  const filters = ["7d", "1m", "3m", "6m", "1y"]; // all buttons

  return (
    <div className="w-full bg-[#FFFFFF4D] overflow-auto rounded-xl p-3 flex items-center justify-between shadow-sm border-2 border-[#FFFFFF] ">
      {/* Left Text */}
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <span>Hello Maya!</span>
        <span className="text-2xl">🌞</span>
      </div>

      {/* Right Filters */}
      <div className="flex items-center gap-1 text-sm font-medium text-gray-500 bg-[#EAEEF8] rounded-[8px]">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={
              active === item
                ? "px-3 py-2 rounded-lg border border-blue-400 text-blue-500 bg-white"
                : "px-3 py-1 rounded-lg text-black "
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}