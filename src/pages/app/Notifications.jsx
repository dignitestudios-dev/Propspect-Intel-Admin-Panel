import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { HiOutlineSelector } from "react-icons/hi";
import { BiSolidNotification } from "react-icons/bi";
import { bin } from "../../assets/export";
import CreatePushNotificationModal from "../../components/app/Notification/CreatePushNotificationModal";
import DeleteModal from "../../components/global/DeleteModal";
import SuccessModal from "../../components/global/SuccessModal";

const notifications = [
  {
    id: 1,
    title: "Latest Updates",
    description:
      "Adipiscing sem nunc a nunc mi. Nibh mattis quis massa aenean nisl potenti.",
    type: "All",
    status: "Send",
  },
  {
    id: 2,
    title: "Upcoming Features",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem .",
    type: "All",
    status: "Send",
  },
  {
    id: 3,
    title: "Bug Fixes",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui tum.",
    type: "All",
    status: "Send",
  },
  {
    id: 4,
    title: "Performance Improvements",
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.",
    type: "All",
    status: "Send",
  },
  {
    id: 5,
    title: "New Integrations",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis  laboriosam.",
    type: "All",
    status: "Send",
  },
  {
    id: 6,
    title: "User Experience Enhancements",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse  nulla pariatur.",
    type: "All",
    status: "Send",
  },
  {
    id: 7,
    title: "Security Updates",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  anim id est laborum.",
    type: "All",
    status: "Send",
  },
  {
    id: 8,
    title: "API Changes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  magna aliqua.",
    type: "All",
    status: "Send",
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("All");
  const [requestSendModal, setRequestSendModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
                className={`px-8 py-2 text-sm font-medium rounded-lg transition-all min-w-[200px] ${
                  activeTab === tab
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
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
            <div className="font-semibold text-sm">Notification Title</div>
            <div className="font-semibold text-sm">Description</div>

            <div className="font-semibold text-sm text-center">
              {activeTab === "All" ? "User Type" : "User Name"}
            </div>
            <div className="font-semibold text-sm text-center">
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                Status <HiOutlineSelector />
              </div>
            </div>
            <div className="font-semibold text-sm text-center">Action</div>
          </div>

          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
              >
                <div className="font-medium text-[#2D3748] text-sm py-2 mt-4">
                  {item.title}
                </div>
                <div className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </div>
                <div className="text-center text-gray-600 text-sm py-2 mt-4">
                  {item.type}
                </div>
                <div className="text-center mt-4">
                  <button className="bg-gray-50 border border-gray-100 px-8 py-2 rounded-xl text-sm text-[#2D3748]  hover:shadow-md transition-shadow inline-flex items-center gap-2">
                    <span className="w-2 h-2 pt-2 bg-green-500 rounded-full"></span>
                    <p className="text-green-500 text-[14px]">{item.status}</p>
                  </button>
                </div>
                <div className="flex justify-center gap-4 text-gray-400 py-2 mt-4">
                  {/* <div className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors">
                    <img src={pen} alt="edit" />
                  </div> */}
                  <div
                    onClick={() => setIsDelete(true)}
                    className="cursor-pointer p-1 w-6 h-6 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <img src={bin} alt="delete" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          isOpen={isDelete}
          onClick={() => {
            setIsDelete(false);
          }}
          message={"Notification will be deleted"}
          title={"Delete Notification"}
        />
      )}
    </div>
  );
}
