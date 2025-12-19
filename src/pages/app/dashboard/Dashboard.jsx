import React from "react";

import { FiUserPlus, FiSend } from "react-icons/fi";
import Header from "../../../components/dashboard/Header";
import State from "../../../components/dashboard/State";

export default function Dashboard() {
  return (
    <div className="w-full space-y-3 ">
      {/* Header */}
      <Header />

      {/* Stats */}
      <State />

      {/* Middle Section */}
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
  {/* Quick Actions */}
  <div className="">
      <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm h-[160px]">

    <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
      <button className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-medium">
        <FiUserPlus /> Add New Athlete
      </button>
      <button className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-medium">
        <FiUserPlus /> Add New User
      </button>
      <button className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-medium">
        <FiSend /> Send Notification
      </button>
    </div>
    </div>


     <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm h-auto mt-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-gray-800">Most Viewed Athletes</h3>
      <div className="flex gap-2 text-sm">
        <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600">7d</span>
        <span className="px-3 py-1 rounded-lg text-gray-500">1m</span>
        <span className="px-3 py-1 rounded-lg text-gray-500">3m</span>
        <span className="px-3 py-1 rounded-lg text-gray-500">6m</span>
        <span className="px-3 py-1 rounded-lg text-gray-500">1y</span>
      </div>
    </div>

    {[1, 2, 3, 4, 5].map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center py-3 border-b last:border-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-500">
            {index + 1}.
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <p className="text-sm font-medium">Athlete Name</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
          854 Views
        </span>
      </div>
    ))}
  </div>
  </div>

<div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm w-full">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-gray-800">Athletes Requests</h3>

    <div className="flex gap-2 text-xs">
      <button className="px-3 py-1 rounded-md bg-blue-50 text-blue-600 font-medium">
        All
      </button>
      <button className="px-3 py-1 rounded-md text-gray-500">
        Pending
      </button>
      <button className="px-3 py-1 rounded-md text-gray-500">
        Contacted
      </button>
    </div>
  </div>

  {/* List */}
  {[
    { status: "Pending", color: "orange" },
    { status: "Declined", color: "red" },
    { status: "Updated", color: "green" },
    { status: "Pending", color: "orange" },
  ].map((item, index) => (
    <div
      key={index}
      className="flex items-center justify-between py-4 border-b last:border-none"
    >
      {/* Athlete */}
      <div className="flex items-center gap-3 w-[30%]">
        <div className="w-9 h-9 rounded-full bg-gray-200" />
        <div>
          <p className="text-sm font-medium text-gray-800">
            Athlete Name
          </p>
          <p className="text-xs text-gray-400">Athlete</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 text-gray-400 w-[20%] justify-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200">
          💬
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200">
          👁
        </div>
      </div>

      {/* Requested By */}
      <div className="flex items-center gap-2 w-[30%]">
        <div className="w-7 h-7 rounded-full bg-gray-200" />
        <p className="text-xs text-gray-500">
          Requested By <br />
          <span className="text-gray-700 font-medium">
            User Name
          </span>
        </p>
      </div>

      {/* Status */}
      <span
        className={`text-xs px-3 py-1 rounded-full font-medium
          ${
            item.color === "orange" &&
            "bg-orange-100 text-orange-600"
          }
          ${
            item.color === "red" &&
            "bg-red-100 text-red-600"
          }
          ${
            item.color === "green" &&
            "bg-green-100 text-green-600"
          }
        `}
      >
        {item.status}
      </span>
    </div>
  ))}
</div>


 

 
</div>
<div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm w-full mt-6">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-gray-800">Added Users</h3>

    <div className="flex gap-3 text-xs">
      <button className="px-3 py-1 border rounded-md text-gray-500">
        Date
      </button>
      <button className="px-3 py-1 border rounded-md text-gray-500">
        Status
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="w-full overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-400 border-b">
          <th className="pb-3">User</th>
          <th className="pb-3">Email</th>
          <th className="pb-3">Password</th>
          <th className="pb-3">Subscription</th>
          <th className="pb-3">User Status</th>
        </tr>
      </thead>

      <tbody>
        {[
          { status: "Active", color: "green" },
          { status: "Inactive", color: "red" },
          { status: "Active", color: "green" },
        ].map((item, index) => (
          <tr
            key={index}
            className="border-b last:border-none"
          >
            {/* User */}
            <td className="py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <span className="font-medium text-gray-800">
                User Name
              </span>
            </td>

            {/* Email */}
            <td className="text-gray-500">
              user@email.com
            </td>

            {/* Password */}
            <td className="text-gray-400">
              ••••••••
            </td>

            {/* Subscription */}
            <td className="text-gray-500">
              Valid till 29 Dec 2026
            </td>

            {/* Status */}
            <td>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${
                    item.color === "green" &&
                    "bg-green-100 text-green-600"
                  }
                  ${
                    item.color === "red" &&
                    "bg-red-100 text-red-600"
                  }
                `}
              >
                {item.status}
              </span>
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
