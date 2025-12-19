import { FaChevronDown, FaFootballBall } from "react-icons/fa";

import { LuRefreshCcw } from "react-icons/lu";

const locations = [
  {
    ip: "192.168.1.1",
    user: "John Doe",
    location: "New York",
    device: "iPhone 12",
    loginTime: "2025-12-17 14:30:00",
    status: "Active",
  },
  {
    ip: "172.16.0.1",
    user: "John Cena",
    location: "California",
    device: "Windows 10 PC",
    loginTime: "2025-12-16 08:15:45",
    status: "Inactive",
  },
];

export default function Location() {
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

        <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
          <h1 className="p-2 pb-4 pt-0 font-bold text-[#302C2C]">
            Top Locations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 ">
            {[
              { label: "San Francisco", value: "22" },
              { label: "California", value: "28" },
              { label: "Florida", value: "20" },
              { label: "Utah", value: "50" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white pt-2 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-sm  text-[#302C2C] ">{item.label}</p>
                  <h2 className="text-[24px] font-bold text-gray-900">
                    {item.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-end p-2 my-1">
          <button className="border rounded-md px-6 py-2 text-[16px] text-[#302C2C] flex items-center ">
            Filter By Location
            <FaChevronDown className="ml-2" />
          </button>
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
            {locations.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
              >
                <div className="font-medium text-[#2D3748] text-sm  flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div>
                    <h2 className="text-gray-900 font-semibold">{item.user}</h2>
                    <p className="text-[#302C2C] text-[14px]">user@gmail.com</p>
                  </div>
                </div>
                <div className=" mt-4">
                  <button className="bg-[#EAEEF8] border border-gray-100 px-3 py-2 rounded-xl text-sm text-[#2D3748]  hover:shadow-md transition-shadow inline-flex items-center gap-2">
                    <p className="text-[#302C2C] text-[14px]">{item.ip}</p>
                  </button>
                </div>

                <div className=" text-[#302C2C] text-sm py-2 mt-4">
                  <h2 className="font-semibold">{item.location}</h2>
                  <p>USA</p>
                </div>
                <div className=" text-[#302C2C] text-sm py-2 mt-4">
                  {item.device}
                </div>
                <div className=" text-[#302C2C] text-sm py-2 mt-4">
                  {item.loginTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
