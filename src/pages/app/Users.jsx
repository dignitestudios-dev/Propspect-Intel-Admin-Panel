import React, { useState } from 'react';
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
import { HiUsers } from "react-icons/hi";

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

export default function Users() {
const [showPassword, setShowPassword] = useState(
    Array(users.length).fill(false)
  );

  const togglePasswordVisibility = (index) => {
    const newShowPassword = [...showPassword];
    newShowPassword[index] = !newShowPassword[index];
    setShowPassword(newShowPassword);
  };


  return (
    <div className="w-full space-y-6">
      {/* Header */}
 <div className="  px-4 py-4 ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Left Side */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <HiUsers   className="text-2xl text-black" />
            <span className="text-xl font-semibold text-gray-900 mt-1">User Management</span>
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
          {/* <button className="flex items-center gap-2 px-4 py-2 text-sm  bg-[#21A366]  rounded-md text-white hover:bg-green-700">
            <FiUpload />
          <span className="text-white">Upload CSV</span>  
          </button> */}

          <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-[#0085CA] text-white hover:bg-blue-700">
            <FiPlus />
          <span className="text-white"> Add Users</span> 
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
     

      {/* Athlete Table */}
      <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30  shadow-sm">
        {/* Table Header */}
       <div className="flex flex-wrap items-center justify-between gap-4 p-2">
  {/* <div className="flex gap-2 border border-white rounded-xl p-2 bg-[#EAEEF8] ">
    {["All", "Active", "Archived"].map((tab, i) => (
      <button
        key={i}
        className={`px-12  py-1.5 rounded-md text-sm font-medium ${
          tab === "All"
            ? "bg-white text-black"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        {tab}
      </button>
    ))}
  </div> */}
  <h1 className='font-bold'>All Users</h1>

  {/* <div className="flex items-center gap-3"> */}

    <div className="relative">
      <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none"
      />
    </div>
  {/* </div> */}
</div>

{/* Archive button aligned to the right */}
{/* <div className="flex justify-end p-2">
  <button className="border rounded-md px-3 py-1.5 text-sm text-gray-600">
    Archive
  </button>
</div> */}

        {/* Table */}
   <div className="overflow-x-auto border rounded-xl mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="px-5 py-3">User</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Password</th>
            <th className="px-5 py-3">Subscription</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Action</th>
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
                    onClick={() => togglePasswordVisibility(index)}
                    className="cursor-pointer hover:text-gray-700"
                  />
                </div>
              </td>

              <td className='px-6'>{user.subscription}</td>

              <td>
                <span
                  className={`px-3 py-3 text-xs rounded-md font-medium ${
                    user.status === "Active"
                      ? "bg-white text-green-600"
                      : "bg-white text-orange-600"
                  }`}
                >
                  ● {user.status}
                </span>
              </td>

              <td>
                <div className="flex gap-3 text-gray-500">
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
