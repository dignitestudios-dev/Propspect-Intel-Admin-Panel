import { FaFootballBall } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { getLoggedUser, getTopLocation } from "../../lib/query/queryFn";
import { useQuery } from "@tanstack/react-query";
import StatsSkeleton from "../../components/global/StatsSkeleton";
import TableSkeleton from "../../components/global/TableSkeleton";
import { useState } from "react";
import Pagination from "../../components/global/Pagination";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../../lib/store/hook";
import { IpLocation } from "../../assets/export";

export default function Location() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["locationstates"],
    queryFn: getTopLocation,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: LoggedUser, isLoading: LoggedUserLoading, refetch: LoggedUserRefetch, isFetching: LoggedUserFetching, } = useQuery({
    queryKey: ["logedUser", page, debouncedSearch],
    queryFn: () => getLoggedUser({ page, search: debouncedSearch }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= LoggedUser?.pagination?.totalPages) {
      setPage(newPage);
    }
  };
  const isRefreshing = isFetching || LoggedUserFetching;
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
              <img src={IpLocation} alt="" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                IP Location Tracking
              </span>
            </div>

            {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
            Athlete Management
          </h1> */}

            <p className="text-sm px-9 text-gray-500">
              Monitor user login locations and activity in real-time
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 font-bold">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md text-[#0085CA] border border-[#E3E3E3] disabled:opacity-50"
            >
              <LuRefreshCcw className={`${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            {/* Profile */}
          </div>
        </div>
      </div>
      <div className=" border border-white rounded-2xl p-6 bg-[rgba(255,255,255,0.3)]">
        {/* Stats */}

        <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
          <h1 className="p-2 pb-4 pt-0 font-bold text-[#302C2C]">
            Top Locations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 ">
            {isLoading ? <StatsSkeleton /> : !data?.data?.length ?
              <div>No Data Found</div> : data?.data?.map((item, i) => (
                <div
                  key={i}
                  className="border border-white pt-2 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
                >
                  <div className="flex flex-col gap-4">
                    <p className="text-sm  text-[#302C2C] ">{item?.state ? item?.state : "N/A"}</p>
                    <h2 className="text-[24px] font-bold text-gray-900">
                      {item?.count}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-end p-2 my-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Athlete Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
            <div className="font-semibold text-sm">User</div>
            <div className="font-semibold text-sm">Ip Address</div>
            <div className="font-semibold text-sm ">Location</div>
            <div className="font-semibold text-sm ">Device</div>
            <div className="font-semibold text-sm ">Login Time</div>
          </div>

          <div className="space-y-4">
            {LoggedUserLoading ? <TableSkeleton /> : !LoggedUser?.data?.length ? <div className=" py-4 text-center text-gray-500">No Data Found</div> : LoggedUser?.data?.map((item) => (
              <div
                // key={item.id}
                className="grid grid-cols-5 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
              >
                <div className="font-medium text-[#2D3748] text-sm  flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold">
                    {(item?.user?.name?.trim()?.charAt(0) || "U").toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-gray-900 font-semibold">{item?.user?.name || "N/A"}</h2>
                    <p className="text-[#302C2C] text-[14px]">{item?.user?.email || "N/A"}</p>
                  </div>
                </div>
                <div className=" mt-4">
                  <button className="bg-[#EAEEF8] border border-gray-100 px-3 py-2 rounded-xl text-sm text-[#2D3748]  hover:shadow-md transition-shadow inline-flex items-center gap-2">
                    <p className="text-[#302C2C] text-[14px]">{item?.ipAddress || "N/A"}</p>
                  </button>
                </div>

                <div className=" text-[#302C2C] text-sm py-2 mt-4">
                  <h2 className="font-semibold">{item?.city || "N/A"}</h2>
                  <p>{item?.state || "N/A"}</p>
                </div>
                <div className=" text-[#302C2C] text-sm py-2 mt-4">
                  {item?.deviceType}
                </div>
                <div className=" text-[#302C2C] text-sm py-2 mt-4">
                  {new Date(item?.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
        <Pagination
          pagination={{
            currentPage: page,
            totalPages: LoggedUser?.pagination?.totalPages || 1,
          }}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
