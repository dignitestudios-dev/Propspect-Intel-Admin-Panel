import React from "react";
import { useState } from "react";

import { FiUserPlus, FiSend, FiEye, FiDownload, FiEdit2, FiTrash2 } from "react-icons/fi";
import Header from "../../../components/dashboard/Header";
import State from "../../../components/dashboard/State";
import { athlete } from "../../../assets/export";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { BiSolidNotification } from "react-icons/bi";

const users = [
  {
    name: "Marcus Johnson",
    email: "marcus@example.com",
    password: "password123",
    subscription: "Premium",
    status: "Active",
  },
  {
    name: "Liam Smith",
    email: "liam@example.com",
    password: "securePassword!",
    subscription: "Basic",
    status: "Archived",
  },
];

export default function Dashboard() {
  const [active, setActive] = useState("All");
  const [popularactive, setpopularActive] = useState("All");
  const [showPassword, setShowPassword] = useState(
    Array(users.length).fill(false)
  );

  const filters = ["All", "Pending", "Contacted"]; // all buttons
  const popularfilters = ["7d", "1m", "3m", "6m", "1y"]; // all buttons


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

            <div className="flex">
              <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-md"></div>

              <h3 className="font-semibold text-gray-800 pt-1">
                Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              <button className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-bold">
                <IoAmericanFootballOutline className="text-blue-500" /> Add New Athlete
              </button>
              <button className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-medium">
                <FiUserPlus  className="text-blue-500" /> Add New User
              </button>
              <button className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-medium">
                <BiSolidNotification   className="text-blue-500" /> Send Notification
              </button>
            </div>
          </div>


          <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm h-auto mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex">
                <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-md"></div>

                <h3 className="font-semibold text-gray-800 pt-1">
                  Most Viewed Athletes</h3>
              </div>            
                <div className="text-gray-500 bg-[#EAEEF8] rounded-[8px] text-[14px]">
                {popularfilters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setpopularActive(item)}
                    className={
                      popularactive === item
                        ? "px-3 py-2 rounded-lg border border-blue-400 text-blue-500 bg-white"
                        : "px-3 py-1 rounded-lg text-black "
                    }
                  >
                    {item}
                  </button>
                ))}
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
                <span className="text-xs px-3 py-3 bg-white text-green-600 rounded-lg">
                  💹 854 Views
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex">
              <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-md"></div>

              <h3 className="font-semibold text-gray-800 pt-1">
                Athletes Requests</h3>
            </div>
            <div className="flex gap-2 text-xs text-gray-500 bg-[#EAEEF8] rounded-lg">
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
              <div className="flex items-center text-gray-400  justify-center">
                <div className="w-auto h-auto ">
                  <img src={athlete} alt="Icon" className="w-[115px] h-[30px]" />
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
                className={`text-xs px-3 py-3 rounded-lg font-medium
          ${item.color === "orange" &&
                  "bg-white text-orange-600"
                  }
          ${item.color === "red" &&
                  "bg-white text-red-600"
                  }
          ${item.color === "green" &&
                  "bg-white text-green-600"
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
<div className="flex">
                <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-md"></div>

                <h3 className="font-semibold text-gray-800 pt-1">
                  Added Users</h3>
              </div> 
          <div className="flex gap-3 text-xs">
            <button className="px-4 py-3 border rounded-md bg-white  text-gray-500">
              Date
            </button>
            <button className="px-4 py-3 bg-white border rounded-md text-gray-500">
              Status
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-xl mt-4">
          <h1 className="p-4 pb-0 font-bold">All Users</h1>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-black border-b">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Password</th>
                <th className="px-5 py-3">Subscription</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200" />
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800">
                        {showPassword[index] ? user.password : "********"}
                      </span>
                      <FiEye
                        className="cursor-pointer hover:text-gray-700"
                      />
                    </div>
                  </td>

                  <td className='px-6'>{user.subscription}</td>

                  <td>
                    <span
                      className={`px-3 py-3 text-xs rounded-md font-medium ${user.status === "Active"
                        ? "bg-white text-green-600"
                        : "bg-white text-orange-600"
                        }`}
                    >
                      ● {user.status}
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
