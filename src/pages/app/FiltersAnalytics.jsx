import { useState } from "react";
import { FaFootballBall } from "react-icons/fa";

import { LuRefreshCcw } from "react-icons/lu";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const barData = {
  labels: ["Location", "Position", "Rating", "School", "Grad Year"],
  datasets: [
    {
      label: "Usage Count",
      data: [8000, 6000, 4000, 2000, 1000],
      backgroundColor: "#d5dceb", // single color for all bars
      hoverBackgroundColor: "#0085CA", // hover color
      borderRadius: 6,
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false }, // remove x-axis grid
      ticks: { color: "#302C2C" },
    },
    y: {
      grid: { display: false }, // remove y-axis grid
      beginAtZero: true,
      max: 20000,
      ticks: { color: "#302C2C" },
    },
  },
};

const donutData = {
  labels: ["Location", "Position", "Rating", "School", "Grad Year"],
  datasets: [
    {
      data: [20, 20, 20, 20, 20],
      backgroundColor: ["#21A366", "#d5dceb", "#d5dceb", "#d5dceb", "#d5dceb"],
      borderWidth: 1,
    },
  ],
};

const donutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // hides the default labels/legend
    },
  },
};

export default function FiltersAnalytics() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="  px-4 py-4 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaFootballBall className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                Search Filter Analytics
              </span>
            </div>

            {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
            Athlete Management
          </h1> */}

            <p className="text-sm px-9 text-gray-500">
              Monitor and analyze user search filter behavior
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 font-bold">
            <div className="flex justify-between items-center bg-[#eaeaf8] rounded-md">
              <div className="flex gap-2 text-sm ">
                <span className="px-3 py-3 rounded-lg bg-white border border-[#0085CA] text-[#0085CA]">
                  7d
                </span>
                <span className="px-3 py-3 rounded-lg text-gray-500">1m</span>
                <span className="px-3 py-3 rounded-lg text-gray-500">3m</span>
                <span className="px-3 py-3 rounded-lg text-gray-500">6m</span>
                <span className="px-3 py-3 rounded-lg text-gray-500">1y</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-md text-[#0085CA] border-[1px] border-[#E3E3E3] ">
              <LuRefreshCcw className="font-bold " />
              <span className="text-[#0085CA]"> Refresh</span>
            </button>

            {/* Profile */}
          </div>
        </div>
      </div>
      <div className=" border border-white rounded-2xl p-6 bg-[rgba(255,255,255,0.3)]">
        {/* Stats */}

        <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30 my-2">
          <h1 className="p-2 pb-4 pt-0 font-bold text-[#302C2C]">
            Top Locations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 ">
            {[
              {
                label: "Total Searches",
                value: "22",
                days: "from last 7 days",
              },
              {
                label: "Users using filters",
                value: "28",
                days: "from last 7 days",
              },
              {
                label: "Avg Filters Per Search",
                value: "20",
                days: "Filter complexity",
              },
              {
                label: "Most Popular Filter",
                value: "50",
                days: "77.6% usage",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white py-2 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-[16px] text-[#302C2C] ">{item.label}</p>
                  <h2 className="text-[24px] font-bold text-gray-900">
                    {item.value}
                  </h2>
                  <p className="text-[14px] font-light text-[#302C2C]">
                    {item.days}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-[#EAEEF8] rounded-xl">
          <div className="flex p-1 rounded-xl ">
            {["Overview", "Filter Details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2 text-sm font-medium rounded-lg transition-all w-[590px] ${
                  activeTab === tab
                    ? "bg-white text-[#1A202C] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {activeTab === "Overview" ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
              <div className="flex flex-col gap-4">
                <p className="text-[20px] text-[#302C2C] font-semibold">
                  Filter Usage Distribution
                </p>
                <p className="text-[16px] text-[#0D0C0C99] mb-6">
                  Popularity of each filter type
                </p>

                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            <div className="border border-white py-2 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30">
              <div className="flex flex-col gap-4 items-center">
                <div className="flex items-start w-full py-2 px-4">
                  <p className="text-[20px] text-[#302C2C] font-semibold">
                    Filter Type Breakdown
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {/* Donut Chart */}
                  <div className="w-[350px] h-[350px]">
                    <Doughnut data={donutData} options={donutOptions} />
                  </div>

                  {/* Stats List */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#21A366]"></span>
                      <p className="text-sm text-gray-700">Location - 20%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#d5dceb]"></span>
                      <p className="text-sm text-gray-700">Position - 20%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#d5dceb]"></span>
                      <p className="text-sm text-gray-700">Rating - 20%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#d5dceb]"></span>
                      <p className="text-sm text-gray-700">School - 20%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#d5dceb]"></span>
                      <p className="text-sm text-gray-700">Grad Year - 20%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                <div className="flex flex-col gap-4">
                  <p className="text-[16px] text-[#302C2C] ">Location Filter</p>
                  <h2 className="text-[24px] font-bold text-gray-900">157</h2>
                  <p className="text-[14px] font-light text-[#302C2C]">
                    Popular Locations:
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Florida</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Florida</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Florida</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                <div className="flex flex-col gap-4">
                  <p className="text-[16px] text-[#302C2C] ">Rating Filter</p>
                  <h2 className="text-[24px] font-bold text-gray-900">157</h2>
                  <p className="text-[14px] font-light text-[#302C2C]">
                    Average Range: 25-75
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">0-20</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">21-40</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">41-60</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                <div className="flex flex-col gap-4">
                  <p className="text-[16px] text-[#302C2C] ">Position Filter</p>
                  <h2 className="text-[24px] font-bold text-gray-900">157</h2>
                  <p className="text-[14px] font-light text-[#302C2C]">
                    Popular Positions:
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Wide Receiver</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Running Back</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Offensive Line</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                <div className="flex flex-col gap-4">
                  <p className="text-[16px] text-[#302C2C] ">Schools Filter</p>
                  <h2 className="text-[24px] font-bold text-gray-900">157</h2>
                  <p className="text-[14px] font-light text-[#302C2C]">
                    Popular Schools:
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">0-20</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">21-40</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">41-60</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                <div className="flex flex-col gap-4">
                  <p className="text-[16px] text-[#302C2C] ">Graduation Year</p>
                  <h2 className="text-[24px] font-bold text-gray-900">157</h2>
                  <p className="text-[14px] font-light text-[#302C2C]">
                    Popular Years:
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Wide Receiver</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Running Back</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[14px]">Offensive Line</p>
                    <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                      26
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
