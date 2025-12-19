 import React from "react";
 export default function state() {
 const metrics = [
        { 
            title: "Registered Users", 
            value: "1,000", 
            change: "+12%", 
            isPositive: true,
            period: "Last 7 days"
        },
        { 
            title: "Active Users", 
            value: "460", 
            change: "+5.2%", 
            isPositive: true,
            period: "Last 7 days"
        },
        { 
            title: "Inactive Users", 
            value: "540", 
            change: "-2.1%", 
            isPositive: false,
            period: "Last 7 days"
        },
        { 
            title: "Athletes Added", 
            value: "80", 
            change: "+12%", 
            isPositive: true,
            period: "Last 7 days"
        },
        { 
            title: "Archived Athletes", 
            value: "500", 
            change: "0.0%", 
            isPositive: null,
            period: "Last 7 days"
        }
    ];

return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 rounded-xl  gap-[1px] bg-white">
  {metrics.map((metric, index) => (
    <div
      key={index}
      className={`p-5   bg-[linear-gradient(150deg,rgba(242,244,249,1)_30%,rgba(249,252,255,1)_100%)] border  border-[#FFFFFF] 
        ${index === 0 ? "rounded-l-xl" : ""} 
        ${index === metrics.length - 1 ? "rounded-r-xl" : ""} 
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{metric.title}</p>
          <p className="text-2xl font-bold mt-1">{metric.value}</p>
        </div>

        {metric.isPositive !== null && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              metric.isPositive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {metric.change}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">{metric.period}</p>
    </div>
  ))}
</div>

            )
        }