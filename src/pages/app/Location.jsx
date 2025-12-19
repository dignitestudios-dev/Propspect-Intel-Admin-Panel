import React from "react";
import { BiBall } from "react-icons/bi";
import { FaChevronDown, FaFootballBall } from "react-icons/fa";
import {
    FiUserPlus,
    FiSend,
    FiSearch,
    FiEye,
    FiEdit,
    FiTrash2,
    FiUpload,
    FiPlus,
    FiDownload,
} from "react-icons/fi";

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
                            <span className="text-xl font-semibold text-gray-900 mt-1">IP Location Tracking</span>
                        </div>

                        {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
            Athlete Management
          </h1> */}

                        <p className="text-sm px-9 text-gray-500">
                            Manage your application users
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm  bg-[#21A366]  rounded-md text-white hover:bg-green-700">
                            <FiUpload />
                            <span className="text-white">Upload CSV</span>
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-[#0085CA] text-white hover:bg-blue-700">
                            <FiPlus />
                            <span className="text-white"> Add Athlete</span>
                        </button>

                        {/* Profile */}

                    </div>
                </div>
            </div>
            {/* Stats */}
            <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
                <h1 className="p-2 pb-4 pt-0 font-bold">Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">

                    {[
                        { label: "Total Athletes", value: "1000" },
                        { label: "Active Athletes", value: "900" },
                        { label: "Pending Requests", value: "20" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border border-white p-4 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
                        >
                            <h2 className="text-[24px] font-bold text-gray-900">
                                {item.value}
                            </h2>
                            <p className="text-sm mt-4 text-gray-500 ">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
  <div className="flex justify-end p-2">
                    <button className="border rounded-md px-3 py-1.5 text-sm text-gray-600 flex items-center">
                        Filter By Location
                        <FaChevronDown className="ml-2" />
                    </button>
                </div>


            {/* Athlete Table */}
            <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30  shadow-sm">
                {/* Table Header */}
               

                {/* Archive button aligned to the right */}
              
                {/* Table */}
                <div className="overflow-x-auto border rounded-xl mt-4">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-black border-b">
                                <th className="px-5 py-3">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    // Add a handler to toggle select all if needed
                                    />
                                </th>
                                <th className="px-5 py-3">IP Address</th>
                                <th className="py-3">Location</th>
                                <th className="py-3">Device</th>
                                <th className="py-3">Login Time</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[
                                {
                                    ip: "192.168.1.1",
                                    location: "New York, USA",
                                    device: "iPhone 12",
                                    loginTime: "2025-12-17 14:30:00",
                                    status: "Active",
                                },
                                {
                                    ip: "172.16.0.1",
                                    location: "London, UK",
                                    device: "Windows 10 PC",
                                    loginTime: "2025-12-16 08:15:45",
                                    status: "Inactive",
                                },
                            ].map((session, i) => (
                                <tr key={i} className="border-b last:border-none">
                                    <td className="px-5 py-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        // Add individual selection logic if necessary
                                        />
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="font-medium text-gray-800">{session.ip}</span>
                                    </td>

                                    <td>{session.location}</td>
                                    <td>{session.device}</td>
                                    <td>{session.loginTime}</td>

                                    <td>
                                        <span
                                            className={`px-3 py-3 text-xs rounded-md font-medium ${session.status === "Active"
                                                    ? "bg-white text-green-600"
                                                    : "bg-white text-orange-600"
                                                }`}
                                        >
                                            ● {session.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex gap-3 text-gray-500">
                                            <FiEye className="cursor-pointer hover:text-gray-700" />
                                            <FiDownload className="cursor-pointer hover:text-gray-700" />
                                            <FiEdit className="cursor-pointer hover:text-gray-700" />
                                            <FiTrash2 className="cursor-pointer hover:text-red-500" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
}
