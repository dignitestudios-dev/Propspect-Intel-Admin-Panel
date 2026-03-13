import React from "react";
import StatsSkeleton from "../global/StatsSkeleton";
export default function state({ adminState, loading, statsFilter }) {
  console.log(adminState, "adminState")
  const metrics = [
    {
      title: "Registered Users",
      value: adminState?.registeredUsers,
      change: "+12%",
      isPositive: true,
      period: `from last ${statsFilter}`,
    },
    {
      title: "Active Users",
      value: adminState?.activeUsers,
      change: "+5.2%",
      isPositive: true,
      period: `from last ${statsFilter}`,
    },
    {
      title: "Inactive Users",
      value: adminState?.inactiveUsers,
      change: "-2.1%",
      isPositive: false,
      period: `from last ${statsFilter}`,
    },
    {
      title: "Athletes Added",
      value: adminState?.athletesAdded,
      change: "+12%",
      isPositive: true,
      period: `from last ${statsFilter}`,
    },
    {
      title: "Archived Athletes",
      value: adminState?.archivedAthletes,
      change: "0.0%",
      isPositive: null,
      period: `from last ${statsFilter}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 rounded-xl  gap-[1px] bg-white">
      {loading ? (
        <StatsSkeleton />) :

        metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-5   bg-[linear-gradient(150deg,rgba(242,244,249,1)_30%,rgba(249,252,255,1)_100%)] border  border-[#FFFFFF] 
        ${index === 0 ? "rounded-l-xl" : ""} 
        ${index === metrics.length - 1 ? "rounded-r-xl" : ""} 
      `}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className=" text-[#131212]">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>

              {/* {metric.isPositive !== null && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              metric.isPositive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {metric.change}
          </span>
        )} */}
            </div>

            <p className="text-[14px] font-extralight text-[#131212] mt-2">
              {metric.period}
            </p>
          </div>
        ))}
    </div>
  );
}
