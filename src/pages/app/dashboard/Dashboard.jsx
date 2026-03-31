import React from "react";
import { useState } from "react";

import {
  FiUserPlus,
  FiEye,
} from "react-icons/fi";
import Header from "../../../components/dashboard/Header";
import State from "../../../components/dashboard/State";
import { athlete } from "../../../assets/export";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { BiSolidNotification } from "react-icons/bi";
import AddUserModal from "../../../components/app/User/AddUserModal";
import CreatePushNotificationModal from "../../../components/app/Notification/CreatePushNotificationModal";
import AddAthleteModal from "../../../components/athlete/AddAthleteModal";
import AthleteAiModal from "../../../components/athlete/AthleteAiModal";
import useDebounce, { useAuth } from "../../../lib/store/hook";
import { useQuery } from "@tanstack/react-query";
import { getAdminStats, getAthleteRequest, getMostViewAthlete, getUsers } from "../../../lib/query/queryFn";
import TableSkeleton from "../../../components/global/TableSkeleton";
import Pagination from "../../../components/global/Pagination";
import SuccessModal from "../../../components/global/SuccessModal";

export default function Dashboard() {

  const { user } = useAuth();
  const [active, setActive] = useState("All");
  const [popularactive, setpopularActive] = useState("7d");
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestSendModal, setRequestSendModal] = useState(false);
  const [isAddAthleteModalOpen, setIsAddAthleteModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [aiModal, setAiModal] = useState(false)
  const [statsFilter, setStatsFilter] = useState('7d')
  const [userStatus, setUserStatus] = useState("Active");
  const [page, setPage] = useState(1)
  const [userPage, setUserPage] = useState(1)
  const [search, setSearch] = useState('')
  const [mostViewPage, setMostViewPage] = useState(1)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [appliedStartDate, setAppliedStartDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");
  const debouncedSearch = useDebounce(search, 500)
  const [successType, setSuccessType] = useState("");


  const statusStyles = {
    pending: "bg-orange-100 text-orange-600",
    declined: "bg-red-100 text-red-600",
    updated: "bg-green-100 text-green-600",
  };
  const filters = ["All", "Pending", "Contacted"];
  const popularfilters = ["7d", "1m", "3m", "6m", "1y"];





  const { data, isLoading, } = useQuery({
    queryKey: ["adminstats", statsFilter],
    queryFn: () => getAdminStats({ statsFilter }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: athleteData, isLoading: athleteLoading, } = useQuery({
    queryKey: ["athleteRequest", page, active],
    queryFn: () => getAthleteRequest({ page, active }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });


  const { data: athleteMostViewData, isLoading: athleteMostViewLoading, } = useQuery({
    queryKey: ["athleteMostView", mostViewPage, popularactive],
    queryFn: () => getMostViewAthlete({ page: mostViewPage, popularactive }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });

  const { data: userData, isLoading: userLoading, refetch: userRefetch } = useQuery({
    queryKey: ["users", userPage, debouncedSearch, appliedStartDate, appliedEndDate, statusFilter],
    queryFn: () => getUsers({ page: userPage, search: debouncedSearch, startDate: appliedStartDate, endDate: appliedEndDate, statusFilter }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= athleteData?.pagination?.totalPages) {
      setPage(newPage);
    }
  };

  const handleMostViewPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= athleteMostViewData?.pagination?.totalPages) {
      setMostViewPage(newPage);
    }
  };
  const handleUserPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= userData?.pagination?.totalPages) {
      setUserPage(newPage);
    }
  };




  return (
    <div className="w-full space-y-3 ">

      <Header user={user} setStatsFilter={setStatsFilter} statsFilter={statsFilter} />


      <State adminState={data} loading={isLoading} statsFilter={statsFilter} />


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

        <div className="">
          <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm h-[160px]">
            <div className="flex items-center">
              <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-sm"></div>

              <h3 className="font-bold text-[20px] text-gray-800 pt-1">
                Quick Actions
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              <button
                onClick={() => setIsAddAthleteModalOpen(true)}
                className="cursor-pointer flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-bold"
              >
                <IoAmericanFootballOutline className="text-[#0085CA]" /> Add New
                Athlete
              </button>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm  font-bold"
              >
                <FiUserPlus className="text-[#0085CA]" /> Add New User
              </button>
              <button
                onClick={() => setRequestSendModal(true)}
                className="flex items-center gap-2 p-3 border-2 border-white rounded-lg hover:bg-gray-50 text-sm font-bold"
              >
                <BiSolidNotification className="text-[#0085CA]" /> Send
                Notification
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm h-auto mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-sm"></div>

                <h3 className="font-bold text-[20px] text-gray-800 pt-1">
                  Most Viewed Athletes
                </h3>
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
            <div className="h-[700px] flex flex-col">

              <div className="flex-1 overflow-y-auto">
                {athleteMostViewLoading ? (
                  <TableSkeleton />
                ) : athleteMostViewData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No Most Athlete Found</div>
                ) : (
                  athleteMostViewData?.data?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b last:border-none px-4"
                    >
                      <div className="flex items-center gap-3">

                        <div className="flex items-center gap-3 max-w-full">
                          <img src={item?.image || "https://placehold.co/400"} className="w-8 h-8 rounded-full" alt="" />
                          <p className="text-sm font-medium break-all">{item?.name}</p>
                        </div>
                      </div>
                      <span className="text-xs px-3 py-1 bg-white text-green-600 rounded-lg">
                        💹 {item?.totalViews || 0} Views
                      </span>
                    </div>
                  ))
                )}
              </div>


              <div className="flex justify-end p-4 border-t">
                <Pagination
                  pagination={athleteMostViewData?.pagination || { currentPage: 1, totalPages: 1 }}
                  onPageChange={handleMostViewPageChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF4D] h-[972px] flex flex-col border-2 border-white rounded-xl p-5 shadow-sm w-full">

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-sm"></div>
              <h3 className="font-bold text-[20px] text-gray-800 pt-1">
                Athletes Requests
              </h3>
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


          <div className="flex-1 overflow-y-auto">
            {athleteLoading ? (
              <TableSkeleton />
            ) : athleteData?.data?.length === 0 ? (
              <div className="text-center p-10">No Athletes Requests Found</div>
            ) : (
              athleteData?.data?.map((item, index) => {
                const statusKey = item?.status?.toLowerCase();

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b last:border-none px-4"
                  >
                    <div className="flex items-center gap-3 w-[30%]">

                      <img src={item?.athlete?.image || "https://placehold.co/400"} className="w-9 h-9 rounded-full " alt="athlete_img" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item?.athlete?.name}</p>
                        <p className="text-xs text-gray-400">Athlete</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-400 justify-center">
                      <div className="w-auto h-auto">
                        <img src={athlete} alt="Icon" className="w-[115px] h-[30px]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-[30%]">
                      <img
                        src={item?.user?.profilePicture}
                        className="w-7 h-7 rounded-full"
                        alt=""
                      />
                      <p className="text-xs text-gray-500">
                        Requested By <br />
                        <span className="text-gray-700 font-medium">{item?.user?.name}</span>
                      </p>
                    </div>

                    <span
                      className={`text-xs w-[90px] text-center px-3 py-3 rounded-lg font-medium ${statusStyles[statusKey] || "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {item?.status?.toUpperCase()}
                    </span>
                  </div>
                )
              })
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Pagination
              pagination={athleteData?.pagination || { currentPage: 1, totalPages: 1 }}
              onPageChange={handlePageChange}
            />
          </div>

        </div>
      </div>
      <div className="bg-[#FFFFFF4D] border-2 border-white rounded-xl p-5 shadow-sm w-full mt-6">

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="border-8 border-l h-[28px] border-[#0085CA] mr-2 rounded-sm"></div>

            <h3 className="font-bold text-[20px] text-gray-800 ">
              Added Users
            </h3>
          </div>
          <div className="flex gap-3 text-xs items-center">
            <div className="flex gap-3 items-center">
              <div className="flex gap-2 items-center">
                <label className="text-gray-500 text-sm">Start:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-2 py-1 border rounded-md text-sm"
                />
                <label className="text-gray-500 text-sm">End:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-2 py-1 border rounded-md text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setAppliedStartDate(startDate);
                  setAppliedEndDate(endDate);
                  setPage(1);
                }}
                className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setAppliedStartDate("");
                  setAppliedEndDate("");
                  setPage(1);
                  userRefetch()
                }}
                className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              >
                Clear
              </button>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-gray-500 text-sm"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>


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
              {userLoading ? (
                <TableSkeleton />) : userData?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className=" py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) :
                userData?.data?.map((user, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="px-5 py-4 flex items-center gap-3">
                      <img src={user?.profilePicture} className="w-9 h-9 rounded-full " alt="" />
                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <div className="flex items-center gap-2 mx-3">
                        <span className="text-gray-800">
                          {"********"}
                        </span>
                        {/* <FiEye className="cursor-pointer hover:text-gray-700" /> */}
                      </div>
                    </td>

                    <td className="px-6">{user.subscriptionPlan}</td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-md font-medium ${user.isActive ? "bg-white text-green-600" : "bg-white text-orange-600"
                          }`}
                      >
                        ● {user.isActive ? "Active" : "Archived"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          pagination={userData?.pagination || { currentPage: 1, totalPages: 1 }}
          onPageChange={handleUserPageChange}
        />
      </div>
      {isAddUserModalOpen && (
        <AddUserModal
          setIsAddUserModalOpen={setIsAddUserModalOpen}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
          successType={successType}
          setSuccessType={setSuccessType}
          refetch={userRefetch}
        />
      )}
      {requestSendModal && (
        <CreatePushNotificationModal
          isOpen={requestSendModal}
          onClick={() => {
            setRequestSendModal(false);
          }}
          onNext={() => {
            setRequestSendModal(false);
            setIsSuccess(true);
          }}
        />
      )}
      {isSuccess && (
        <SuccessModal
          onClick={() => {
            setIsSuccess(false);
          }}
          message={"Notification Sent"}
          title={"Notification has been sent Successfully"}
        />
      )}
      {isAddAthleteModalOpen && (
        <AddAthleteModal
          onClick={() => setIsAddAthleteModalOpen(false)}
          handleAiModal={() => {
            setAiModal(true)
            setIsAddAthleteModalOpen(false);

          }}
        />
      )}
      {aiModal && <AthleteAiModal onClick={() => setAiModal(false)} />}
    </div>
  );
}
