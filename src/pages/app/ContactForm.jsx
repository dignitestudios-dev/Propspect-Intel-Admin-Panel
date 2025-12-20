import { useState } from "react";
import { BiSolidNotification } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { HiOutlineSelector } from "react-icons/hi";
import { bin, eye, sms } from "../../assets/export";
import MessageDetailModal from "../../components/app/ContactForm/MessageDetailModal";
import MessageReplyModal from "../../components/app/ContactForm/MessageReplyModal";
import DeleteModal from "../../components/global/DeleteModal";

const notifications = [
  {
    id: 1,
    title: "Latest Updates",
    description:
      "Adipiscing sem nunc a nunc mi. Nibh mattis quis massa aenean nisl potenti.",
    type: "19/05/2025",
    status: "Pending",
  },
  {
    id: 2,
    title: "Upcoming Features",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem .",
    type: "19/05/2025",
    status: "Replied",
  },
  {
    id: 3,
    title: "Bug Fixes",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui tum.",
    type: "19/05/2025",
    status: "Pending",
  },
  {
    id: 4,
    title: "Performance Improvements",
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.",
    type: "17/05/2025",
    status: "Replied",
  },
  {
    id: 5,
    title: "New Integrations",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis  laboriosam.",
    type: "15/05/2025",
    status: "Pending",
  },
  {
    id: 6,
    title: "User Experience Enhancements",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse  nulla pariatur.",
    type: "19/05/2025",
    status: "Pending",
  },
];

const messages = [
  {
    id: 1,
    contactName: "John Doe",
    contactEmail: "john@example.com",
    originalMessage: "Hello, I need help with my account.",
    reply: "We’ve resolved your issue, please check again.",
    date: "17/11/2025",
  },
  {
    id: 2,
    contactName: "Jane Smith",
    contactEmail: "jane@example.com",
    originalMessage: "Can I reset my password?",
    reply: "",
    date: "17/11/2025",
  },
];

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [viewMessage, setViewMessage] = useState(false);
  const [replyMessage, setReplyMessage] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <div className="w-full min-h-screen p-4 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BiSolidNotification className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                Contact Query Management
              </span>
            </div>

            {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
                       Athlete Management
                     </h1> */}

            <p className="text-sm px-9 text-gray-500">
              Manage and respond to customer inquiries
            </p>
          </div>
        </div>
      </div>
      {/* Main Card Container */}
      <div className=" border border-white rounded-xl p-3 shadow-sm">
        <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
            {[
              { label: "New Queries", value: "22" },
              { label: "Replied", value: "28" },
              { label: "This Week", value: "20" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white pt-3 pb-1 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
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

        {/* Controls: Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-2">
          <div className="flex bg-[#eaeaf8] p-1 rounded-xl w-fit ">
            {["All", "Replied"].map((tab) => (
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
        {activeTab === "All" ? (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
              <div className="font-semibold text-sm">Contact</div>
              <div className="font-semibold text-sm">Message Preview</div>
              <div className="font-semibold text-sm text-center">
                <div className="flex items-center justify-center gap-1 cursor-pointer">
                  Status <HiOutlineSelector />
                </div>
              </div>
              <div className="font-semibold text-sm text-center">Date</div>
              <div className="font-semibold text-sm text-center">Action</div>
            </div>

            <div className="space-y-4">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
                >
                  <div className="font-medium text-[#2D3748] text-sm  flex items-center gap-1">
                    <div>
                      <h2 className="text-gray-900 font-semibold">
                        {item.title}
                      </h2>
                      <p className="text-[#302C2C] text-[14px]">
                        user@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </div>
                  <div className="text-center mt-4">
                    <button className="bg-gray-50 border border-gray-100 px-8 py-2 rounded-xl text-sm text-[#2D3748]  hover:shadow-md transition-shadow inline-flex items-center gap-2">
                      <p
                        className={`${
                          item.status === "Replied"
                            ? "text-green-500"
                            : "text-[#E57E25]"
                        } text-[14px]`}
                      >
                        {item.status}
                      </p>
                    </button>
                  </div>
                  <div className="text-center text-gray-600 text-sm py-2 mt-4">
                    {item.type}
                  </div>

                  <div className="flex justify-center gap-4 text-gray-400 py-2 mt-4">
                    <div
                      onClick={() => {
                        setViewMessage(true);
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <img src={eye} alt="edit" />
                    </div>
                    <div
                      onClick={() => {
                        setViewMessage(false);
                        setReplyMessage(true);
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <img src={sms} alt="edit" />
                    </div>
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
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
              <div className="font-semibold text-sm">Contact</div>
              <div className="font-semibold text-sm text-center">
                Original Message
              </div>
              <div className="font-semibold text-sm text-center">Reply</div>
              <div className="font-semibold text-sm text-center">Date</div>
              <div className="font-semibold text-sm text-center">Action</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="grid grid-cols-5 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
                >
                  {/* Contact */}
                  <div className="font-medium text-[#2D3748] text-sm flex flex-col">
                    <h2 className="text-gray-900 font-semibold">
                      {msg.contactName}
                    </h2>
                    <p className="text-[#302C2C] text-[14px]">
                      {msg.contactEmail}
                    </p>
                  </div>

                  {/* Original Message */}
                  <div className="text-[#302C2C] text-sm leading-relaxed">
                    {msg.originalMessage}
                  </div>

                  {/* Reply */}
                  <div className="text-[#302C2C] text-sm leading-relaxed text-center border-l-2 border-[#E3E3E3]">
                    {msg.reply ? (
                      <span className="">{msg.reply}</span>
                    ) : (
                      <span className=" italic">No reply yet</span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-center text-[#302C2C] text-sm py-2 mt-4">
                    {msg.date}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 text-gray-400 py-2 mt-4">
                    <div
                      onClick={() => {
                        setViewMessage(true);
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <img src={eye} alt="edit" />
                    </div>
                    <div
                      onClick={() => {
                        setViewMessage(false);
                        setReplyMessage(true);
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <img src={sms} alt="edit" />
                    </div>
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
        )}
      </div>
      {viewMessage && (
        <MessageDetailModal
          isOpen={viewMessage}
          onClick={() => {
            setViewMessage(false);
          }}
          onNext={() => {
            setViewMessage(false);
            setReplyMessage(true);
          }}
          title="Email verified"
          description="Your email has been verified successfully."
        />
      )}
      {replyMessage && (
        <MessageReplyModal
          isOpen={replyMessage}
          onClick={() => {
            setReplyMessage(false);
          }}
        />
      )}
      {isDelete && (
        <DeleteModal
          isOpen={isDelete}
          onClick={() => {
            setIsDelete(false);
          }}
          message={"Message will be deleted"}
          title={"Delete Message"}
        />
      )}
    </div>
  );
};

export default ContactForm;
