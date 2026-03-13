import React from "react";

const Stats = ({ athlete }) => {
  return (
    <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
      <h1 className="p-2 pb-4 pt-0 font-bold">Career Stats Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 ">
        {[
          { label: "Touches", value: athlete?.touches },
          { label: "Successful Passes", value: athlete?.successfulPasses },
          { label: "Pass Accuracy", value: athlete?.passAccuracy },
          { label: "Tackles Completed", value: athlete?.tacklesCompleted },
          { label: "Carries", value: athlete?.carries },
          { label: "Tries", value: athlete?.tries },
        ]?.map((item, i) => (
          <div
            key={i}
            className="border-2 border-white p-4 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
          >
            <h2 className="text-[24px] font-bold text-gray-900">
              {item.value}
            </h2>
            <p className="text-sm mt-4 text-gray-500 ">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
