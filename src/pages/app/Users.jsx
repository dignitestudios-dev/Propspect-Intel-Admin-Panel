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
import { getStatesUsers, getUsers } from "../../lib/query/queryFn";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "../../components/global/TableSkeleton";
import axiosinstance from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import Pagination from "../../components/global/Pagination";
import useDebounce from "../../lib/store/hook";
import StatsSkeleton from "../../components/global/StatsSkeleton";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('')
  const [editUser, setEditUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState("Active");
  const [isDelete, setIsDelete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const [successType, setSuccessType] = useState("");



  const openActivityModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

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


  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: () => getUsers({ page, search: debouncedSearch }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: userState, isLoading: userLoading, isError: isErrorState, } = useQuery({
    queryKey: ["userStates"],
    queryFn: getStatesUsers,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      const response = await axiosinstance.delete(`/user/${deleteId}`);
      if (response.status === 200) {
        refetch();
        setIsDelete(false);
        setDeleteId(null);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleteLoading(false)
    }
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="w-full space-y-6">

      <div className="  px-4 pt-4 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <HiUsers className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                User Management
              </span>
            </div>

            <p className="text-sm px-9 text-gray-500">
              Manage your application users
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-[#0085CA] text-white hover:bg-blue-700"
            >
              <FiPlus />
              <span className="text-white"> Add Users</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
        <h1 className="p-2 pb-4 pt-0 font-bold">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {userLoading ? (
            <StatsSkeleton count={3} />
          ) : isErrorState ? (
            <div className="col-span-3 text-center text-red-500">
              Error loading user statistics
            </div>
          ) : (
            [
              { label: "Total Users", value: userState?.totalUsers },
              { label: "New This Month", value: userState?.newthisMonthUsers },
              { label: "Active Users", value: userState?.activeUsers },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white p-4 rounded-xl shadow-sm text-center bg-gray-100 bg-opacity-30"
              >
                <h2 className="text-[24px] font-bold text-gray-900">
                  {item.value ?? 0}
                </h2>
                <p className="text-sm mt-4 text-gray-500">{item.label}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30  shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 p-2">

          <h1 className="font-bold">All Users</h1>
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
              {isLoading ? (
                <TableSkeleton rows={5} />
              ) : isError ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-red-500">
                    Error loading user data
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                data?.data?.map((user, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="px-5 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden">
                        <img
                          src={user?.profilePicture || "https://placehold.co/600x400"}
                          alt="user_profile"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-800">{user?.name}</span>
                    </td>

                    <td>{user?.email}</td>

                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800">{"********"}</span>
                      </div>
                    </td>

                    <td className="px-6">{user?.subscriptionPlan || "N/A"}</td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-md font-medium ${user.isActive ? "bg-white text-green-600" : "bg-white text-orange-600"
                          }`}
                      >
                        ● {user.isActive ? "Active" : "Archived"}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-6 text-lg text-black">
                        <MdMonitor
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() => openActivityModal(user)}
                          title="View Activity"
                        />
                        <FiEdit2
                          onClick={() => {
                            setEditUser(user);
                            setIsAddUserModalOpen(true);
                          }}
                          className="cursor-pointer hover:text-gray-700"
                        />
                        <FiTrash2
                          onClick={() => {
                            setDeleteId(user?._id);
                            setIsDelete(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
          onPageChange={handlePageChange}
        />


        {isAddUserModalOpen && (
          <AddUserModal
            setIsAddUserModalOpen={setIsAddUserModalOpen}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            editUser={editUser}
            setEditUser={setEditUser}
            refetch={refetch}
            setIsSuccess={setIsSuccess}
            successType={successType}
            setSuccessType={setSuccessType}

          />
        )}

        {isModalOpen && (
          <div className="fixed inset-0  z-50  flex items-center justify-end bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl h-full shadow-xl w-full max-w-md mx-4 overflow-hidden">

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


              <div className="p-6 max-h-[90vh] overflow-y-auto ">
                {activityLog?.map((day, dayIdx) => (
                  <div key={dayIdx} className="mb-8">
                    <h3 className="text-center text-sm font-bold text-gray-800 mb-6">
                      {day.date}
                    </h3>
                    <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                      {day.events.map((event, eventIdx) => (
                        <div key={eventIdx} className="relative pl-8">

                          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                            <div className="bg-[#001F3F] p-1 rounded-sm">
                              <span className="text-[8px] text-white font-bold">
                                PI
                              </span>
                            </div>
                          </div>


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
            onClick={() => setIsDelete(false)}
            onNext={handleDelete}
            message={"User will be deleted"}
            title={"Delete User"}
            loading={deleteLoading}
          />
        )}
        {isSuccess && (
          <SuccessModal
            onClick={() => {
              setIsSuccess(false);
            }}
            title={`User ${successType}`}
            message={`User has been ${successType} successfully.`}
          />
        )}
      </div>
    </div>
  );
}
