import { useState } from "react";

import { MdMonitor } from "react-icons/md";

import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiPlus,
  FiX,
  FiEdit2,
} from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import AddUserModal from "../../components/app/User/AddUserModal";
import DeleteModal from "../../components/global/DeleteModal";
import SuccessModal from "../../components/global/SuccessModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("🚀 ~ Users ~ selectedUser:", selectedUser);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState("Active");
  const [isDelete, setIsDelete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const togglePasswordVisibility = (index) => {
    const newShowPassword = [...showPassword];
    newShowPassword[index] = !newShowPassword[index];
    setShowPassword(newShowPassword);
  };

  const openActivityModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Mock Data for the Activity Log
  const activityLog = [
    {
      date: "25 Jan 2025",
      events: [
        { time: "8:00 PM", action: "Logged In", details: null },
        {
          time: "9:00 PM",
          action: "Applied Filters",
          details:
            "Rating Filters (Min 0 - Max 92) ● Rating Filters (Min 0 - Max 92)",
        },
        {
          time: "9:00 PM",
          action: "Opened Player Profile",
          details: "Marcus Johnson",
          isPlayer: true,
        },
        {
          time: "9:32 PM",
          action: "Requested Player Info",
          details: "Marcus Johnson",
          isPlayer: true,
        },
        { time: "9:56 PM", action: "Logged Out", details: null },
      ],
    },
    {
      date: "26 Jan 2025",
      events: [{ time: "8:00 PM", action: "Logged In", details: null }],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="  px-4 pt-4 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <HiUsers className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                User Management
              </span>
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

            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-[#0085CA] text-white hover:bg-blue-700"
            >
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
              <p className="text-sm mt-4 text-gray-500 ">{item.label}</p>
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
          <h1 className="font-bold">All Users</h1>

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
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
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

                  <td className="px-6">{user.subscription}</td>

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
                    <div className="flex gap-6 text-lg  text-black">
                      <MdMonitor
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => openActivityModal(user)}
                        title="View Activity"
                      />{" "}
                      <FiEdit2
                        onClick={() => setIsAddUserModalOpen(true)}
                        className="cursor-pointer hover:text-gray-700"
                      />
                      <FiTrash2
                        onClick={() => setIsDelete(true)}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- ADD USER MODAL --- */}
        {isAddUserModalOpen && (
          <AddUserModal
            setIsAddUserModalOpen={setIsAddUserModalOpen}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            onNext={() => {
              setIsAddUserModalOpen(false);
              setIsSuccess(true);
            }}
          />
        )}
        {/* ACTIVITY MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0  z-50  flex items-center justify-end bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl h-full shadow-xl w-full max-w-md mx-4 overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">
                  Monitor User Activity
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className=" border hover:bg-gray-100 rounded-md p-2 transition-colors"
                >
                  <FiX size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Modal Body / Timeline */}
              <div className="p-6 max-h-[90vh] overflow-y-auto ">
                {activityLog?.map((day, dayIdx) => (
                  <div key={dayIdx} className="mb-8">
                    <h3 className="text-center text-sm font-bold text-gray-800 mb-6">
                      {day.date}
                    </h3>
                    <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                      {day.events.map((event, eventIdx) => (
                        <div key={eventIdx} className="relative pl-8">
                          {/* Timeline Icon */}
                          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                            <div className="bg-[#001F3F] p-1 rounded-sm">
                              <span className="text-[8px] text-white font-bold">
                                PI
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-medium uppercase">
                              {event.time}
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {event.action}
                            </span>

                            {event.details && !event.isPlayer && (
                              <span className="text-xs text-gray-500 mt-1 leading-relaxed">
                                {event.details}
                              </span>
                            )}

                            {event.isPlayer && (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                                  <img
                                    src={`https://ui-avatars.com/api/?name=${event.details}&background=random`}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-600 font-medium">
                                  {event.details}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {isDelete && (
          <DeleteModal
            isOpen={isDelete}
            onClick={() => {
              setIsDelete(false);
            }}
            message={"User will be deleted"}
            title={"Delete User"}
          />
        )}
        {isSuccess && (
          <SuccessModal
            onClick={() => {
              setIsSuccess(false);
            }}
            title={"User Added"}
            message={"User has been added successfully."}
          />
        )}
      </div>
    </div>
  );
}
