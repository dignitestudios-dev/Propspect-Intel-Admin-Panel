import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { BiSolidNotification } from "react-icons/bi";
import { bin } from "../../assets/export";
import CreatePushNotificationModal from "../../components/app/Notification/CreatePushNotificationModal";
import DeleteModal from "../../components/global/DeleteModal";
import SuccessModal from "../../components/global/SuccessModal";
import useDebounce from "../../lib/store/hook";
import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../lib/query/queryFn";
import TableSkeleton from "../../components/global/TableSkeleton";
import Pagination from "../../components/global/Pagination";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";


export default function Notifications() {
  const [activeTab, setActiveTab] = useState("All");
  const [requestSendModal, setRequestSendModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notification", page, debouncedSearch, activeTab],
    queryFn: () => getNotification({ page, search: debouncedSearch, activeTab }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };
  const handleDelete = async () => {
    setIsDeleteLoading(true)
    try {
      const response = await axiosinstance.delete(`/notification/${selectedId}`)
      if (response.status === 200 || response.status === 201) {
        SuccessToast(response?.data?.message)
        setIsDelete(false)
        refetch()
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message)
    } finally {
      setIsDeleteLoading(false)
    }
  }
  return (
    <div className="w-full min-h-screen  p-4 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BiSolidNotification className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                Push Notifications
              </span>
            </div>

            {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
                     Athlete Management
                   </h1> */}

            <p className="text-sm px-9 text-gray-500">
              Manage your push notifications to users
            </p>
          </div>
        </div>
        <button
          onClick={() => setRequestSendModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors shadow-sm"
        >
          <FiPlus strokeWidth={3} />
          <span>New Notification</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className=" border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* Controls: Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex bg-[#eaeaf8] p-1 rounded-xl w-fit ">
            {["All", "Specific Users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2 text-sm font-medium rounded-lg transition-all min-w-[200px] ${activeTab === tab
                  ? "bg-white text-[#1A202C] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
            <div className="font-semibold text-sm">Notification Title</div>
            <div className="font-semibold text-sm">Description</div>

            <div className="font-semibold text-sm text-center">
              {activeTab === "All" ? "User Type" : "Specific"}
            </div>
            {/* <div className="font-semibold text-sm text-center">
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                Status <HiOutlineSelector />
              </div>
            </div> */}
            <div className="font-semibold text-sm text-center">Action</div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <TableSkeleton />
            ) : data?.data.length === 0 ? (
              <div className="text-center p-10">No Notification Found</div>
            ) : (
              data?.data?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
                >
                  <div className="font-medium text-[#2D3748] text-sm py-2 mt-4">
                    {item.title}
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed py-2 mt-4">
                    {item.description}
                  </div>
                  <div className="text-center text-gray-600 text-sm py-2 mt-4">
                    {item.notificationType}
                  </div>
                  {/* <div className="text-center mt-4">
                    <button className="bg-gray-50 border border-gray-100 px-8 py-2 rounded-xl text-sm text-[#2D3748]  hover:shadow-md transition-shadow inline-flex items-center gap-2">
                      <span className="w-2 h-2 pt-2 bg-green-500 rounded-full"></span>
                      <p className="text-green-500 text-[14px]">{item.status}</p>
                    </button>
                  </div> */}
                  <div className="flex justify-center gap-4 text-gray-400 py-2 mt-4">
                    {/* <div className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors">
                    <img src={pen} alt="edit" />
                  </div> */}
                    <div
                      onClick={() => {

                        setSelectedId(item?._id)

                        setIsDelete(true)
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <img src={bin} alt="delete" />
                    </div>
                  </div>
                </div>
              )))}
          </div>
        </div>
        <Pagination
          pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
          onPageChange={handlePageChange}
        />
      </div>
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
      {isDelete && (
        <DeleteModal
          loading={isDeleteLoading}
          isOpen={isDelete}
          onClick={() => setIsDelete(false)}
          onNext={handleDelete}
          message={"Notification will be deleted"}
          title={"Delete Notification"}
        />
      )}
    </div>
  );
}
