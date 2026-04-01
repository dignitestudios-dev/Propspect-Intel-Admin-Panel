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
import { useQuery } from "@tanstack/react-query";
import { getAnalytics, getFilterDetail, getGraphDetail } from "../../lib/query/queryFn";
import StatsSkeleton from "../../components/global/StatsSkeleton";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const donutColors = [
  "#21A366",
  "#0085CA",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#21A366",
];

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
      display: false,
    },
  },
};

const CharacterCard = ({ title, score, data }) => {
  const cleanData = (arr) => {
    return arr
      ?.filter((item) => item._id && item._id.trim() !== "")
      ?.map((item) => ({
        label: item._id.trim(),
        value: item.count,
      }));
  };
  const getColor = (label) => {
    switch (label) {
      case "A":
        return "bg-black text-white";
      case "B":
        return "bg-green-500 text-white";
      case "C":
        return "bg-gray-400 text-white";
      case "D":
        return "bg-yellow-400 text-black";
      case "F":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };
  const grades = cleanData(data);

  return (
    <div className="border border-white rounded-2xl p-6 bg-white bg-opacity-40 shadow-sm">
      <h3 className="text-[16px] font-semibold text-[#302C2C]">
        {title}
      </h3>
      {grades?.length === 0 ? (
        <p className="text-sm text-gray-400 text-center pt-10">
          No Data Found
        </p>
      ) : (
        <>
          <h2 className="text-[36px] font-bold text-black mt-2">
            {score}
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Average Range
          </p>

          <div className="space-y-3">
            {grades.map((grade, i) => (
              <div key={i} className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold ${getColor(
                      grade.label
                    )}`}
                  >
                    {grade.label}
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg px-3 py-1 text-sm text-gray-700">
                  {grade.value}
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default function FiltersAnalytics() {
  const ranges = ["7d", "1m", "3m", "6m", "1y"];
  const [activeTab, setActiveTab] = useState("Overview");
  const [range, setRange] = useState("")
  const { data, isLoading, refetch, isFetching: analyticsFetching } = useQuery({
    queryKey: ["analytics", range],
    queryFn: () => getAnalytics({ range }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: filterDetailsData, isLoading: filterDetailsLoading, isFetching: analyticsfilterdetails } = useQuery({
    queryKey: ["filterdetails"],
    queryFn: getFilterDetail,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: overViewDetail, isLoading: overViewDetailLoading, isFetching: analyticsOverview } = useQuery({
    queryKey: ["overViewDetail"],
    queryFn: getGraphDetail,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const graphData = overViewDetail?.data || [];

  const labels = graphData.map((item) =>
    item.filter
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
  );
  const counts = graphData.map((item) => item.count);
  const percentages = graphData.map((item) => item.percentage);
  const dynamicBarData = {
    labels,
    datasets: [
      {
        label: "Usage Count",
        data: counts,
        backgroundColor: "#d5dceb",
        hoverBackgroundColor: "#0085CA",
        borderRadius: 6,
      },
    ],
  };
  const dynamicDonutData = {
    labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: donutColors,
        borderWidth: 1,
      },
    ],
  };

  const isRefreshing = analyticsFetching || analyticsfilterdetails || analyticsOverview;
  const handleRefresh = () => {
    if (isRefreshing) return;
    refetch();
    LoggedUserRefetch();
  };


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
              <div className="flex gap-2 text-sm">
                {ranges.map((r) => (
                  <span
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-3 py-3 rounded-lg cursor-pointer 
            ${range === r
                        ? "bg-white border border-[#0085CA] text-[#0085CA]"
                        : "text-gray-500"
                      }`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md text-[#0085CA] border border-[#E3E3E3] disabled:opacity-50"
            >
              <LuRefreshCcw className={`${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
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
            {isLoading ? (
              <StatsSkeleton />
            ) : (
              [
                {
                  label: "Total Searches",
                  value: data?.data?.totalSearches || "N/A",
                  days: `from last ${range} `,
                },
                {
                  label: "Users using filters",
                  value: data?.data?.usersUsingFilters || "N/A"
                  ,
                  days: `from last ${range} `,
                },
                {
                  label: "Avg Filters Per Search",
                  value: data?.data?.avgFiltersPerSearch.toFixed(2) || "N/A",
                  days: "Filter complexity",
                },
                {
                  label: "Most Popular Filter",
                  value: data?.data?.mostPopularFilter
                    ? data.data.mostPopularFilter
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                    : "N/A",
                  days: data?.data?.mostPopularPercentage
                    ? `${data.data.mostPopularPercentage}% usage`
                    : "N/A",
                }
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
              ))

            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-[#EAEEF8] rounded-xl">
          <div className="flex p-1 rounded-xl ">
            {["Overview", "Filter Details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2 text-sm font-medium rounded-lg transition-all w-[590px] ${activeTab === tab
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
          <>
            {
              overViewDetailLoading ? (
                <div className="grid grid-cols-2 gap-2" >
                  {/* Bar Chart Skeleton */}
                  < div className="border border-white p-4 rounded-xl bg-gray-100 bg-opacity-30 animate-pulse" >
                    <div className="space-y-4">
                      <div className="h-5 w-48 bg-gray-300 rounded"></div>
                      <div className="h-4 w-64 bg-gray-300 rounded"></div>

                      {/* Fake bars */}
                      <div className="mt-6 space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-6 bg-gray-300 rounded w-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Doughnut Skeleton */}
                  <div className="border border-white p-4 rounded-xl bg-gray-100 bg-opacity-30 animate-pulse">
                    <div className="space-y-4 flex flex-col items-center">
                      <div className="h-5 w-48 bg-gray-300 rounded self-start"></div>

                      <div className="flex items-center gap-6 mt-4">
                        {/* Circle */}
                        <div className="w-[200px] h-[200px] rounded-full bg-gray-300"></div>

                        {/* Legend */}
                        <div className="space-y-3">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                              <div className="h-4 w-24 bg-gray-300 rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                    <div className="flex flex-col gap-4">
                      <p className="text-[20px] text-[#302C2C] font-semibold">
                        Filter Usage Distribution
                      </p>
                      <p className="text-[16px] text-[#0D0C0C99] mb-6">
                        Popularity of each filter type
                      </p>

                      <Bar data={dynamicBarData} options={barOptions} />
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
                        <div className="w-[350px] h-[350px]">
                          <Doughnut data={dynamicDonutData} options={donutOptions} />
                        </div>


                        <div className="flex flex-col gap-3">
                          {graphData?.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: donutColors[i] }}
                              ></span>

                              <p className="text-sm text-gray-700">
                                {item.filter.charAt(0).toUpperCase() + item.filter.slice(1)} - {item.percentage}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </>

        ) : (
          <>
            {filterDetailsLoading ? (

              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-white p-4 rounded-xl bg-gray-100 bg-opacity-30 animate-pulse"
                  >
                    <div className="space-y-4">
                      <div className="h-4 w-40 bg-gray-300 rounded"></div>
                      <div className="h-6 w-20 bg-gray-300 rounded"></div>

                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex justify-between items-center">
                          <div className="h-4 w-24 bg-gray-300 rounded"></div>
                          <div className="h-4 w-10 bg-gray-300 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            ) : (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                    <div className="flex flex-col gap-4">
                      <p className="text-[16px] text-[#302C2C] ">Location Filter</p>
                      <h2 className="text-[24px] font-bold text-gray-900">{filterDetailsData?.data?.location?.total || 0}</h2>
                      <p className="text-[14px] font-light text-[#302C2C]">
                        Popular Locations:
                      </p>
                      {filterDetailsData?.data?.location?.data?.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center">No Data Found</p>
                      ) : filterDetailsData?.data?.location?.data?.map((location, index) => ((
                        <div key={index} className="flex justify-between items-center">
                          <p className="font-bold text-[14px]">{location?._id || "N/A"}</p>
                          <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                            {location?.count || "0"}
                          </div>
                        </div>

                      )))}

                    </div>
                  </div>
                  <CharacterCard
                    title="Personal Character"
                    score={filterDetailsData?.data?.personalCharacter?.total || 0}
                    data={filterDetailsData?.data?.personalCharacter?.data}
                  />

                  <CharacterCard
                    title="Football Character"
                    score={filterDetailsData?.data?.footballCharacter?.total || 0}
                    data={filterDetailsData?.data?.footballCharacter?.data}
                  />


                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">

                  <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                    <div className="flex flex-col gap-4">
                      <p className="text-[16px] text-[#302C2C] ">Schools Filter</p>
                      <h2 className="text-[24px] font-bold text-gray-900">{filterDetailsData?.data?.school?.total || 0}</h2>
                      <p className="text-[14px] font-light text-[#302C2C]">
                        Popular Schools:
                      </p>
                      {filterDetailsData?.data?.school?.data?.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center">No Data Found</p>
                      ) : filterDetailsData?.data?.school?.data?.map((school, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <p className="font-bold text-[14px]">{school?._id || "N/A"}</p>
                          <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                            {school?.count || "0"}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                    <div className="flex flex-col gap-4">
                      <p className="text-[16px] text-[#302C2C] ">Graduation Year</p>
                      <h2 className="text-[24px] font-bold text-gray-900">{filterDetailsData?.data?.gradYear?.total || 0}</h2>
                      <p className="text-[14px] font-light text-[#302C2C]">
                        Popular Years:
                      </p>
                      {filterDetailsData?.data?.gradYear?.data?.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center">No Data Found</p>
                      ) : filterDetailsData?.data?.gradYear?.data?.map((gradYear, index) => (

                        <div key={index} className="flex justify-between items-center">
                          <p className="font-bold text-[14px]">{gradYear?._id}</p>
                          <div className=" border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                            {gradYear?.count}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className="border border-white p-4 rounded-xl shadow-sm bg-gray-100 bg-opacity-30">
                    <div className="flex flex-col gap-4">
                      <p className="text-[16px] text-[#302C2C] ">Position Filter</p>
                      <h2 className="text-[24px] font-bold text-gray-900">{filterDetailsData?.data?.position?.total || 0}</h2>
                      <p className="text-[14px] font-light text-[#302C2C]">
                        Popular Positions:
                      </p>
                      {filterDetailsData?.data?.position?.data?.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center">No Data Found</p>
                      ) : (
                        filterDetailsData?.data?.position?.data?.map((position, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <p className="font-bold text-[14px]">
                              {position?._id || "N/A"}
                            </p>

                            <div className="border border-[#E3E3E3] rounded-[8px] px-2 py-1 text-[#302C2C] text-[14px] font-light">
                              {position?.count || 0}
                            </div>
                          </div>
                        ))
                      )}

                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div >


    </div >
  );
}
