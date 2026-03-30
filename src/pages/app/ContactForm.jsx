import { useState } from "react";
import { BiSolidNotification } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { HiOutlineSelector } from "react-icons/hi";
import { bin, eye, sms } from "../../assets/export";
import MessageDetailModal from "../../components/app/ContactForm/MessageDetailModal";
import MessageReplyModal from "../../components/app/ContactForm/MessageReplyModal";
import DeleteModal from "../../components/global/DeleteModal";
import ReplyDetailModal from "../../components/app/ContactForm/ReplyDetailModal";
import SuccessModal from "../../components/global/SuccessModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContact, getContactById, getContactStats } from "../../lib/query/queryFn";
import { formatDate } from "../../lib/helpers";
import TableSkeleton from "../../components/global/TableSkeleton";
import StatsSkeleton from "../../components/global/StatsSkeleton";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import Pagination from "../../components/global/Pagination";


const ContactForm = () => {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("All");
  const [viewMessage, setViewMessage] = useState(false);
  const [replyMessage, setReplyMessage] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState('')
  const [deleteloading, setDeleteLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data: contactstats, isLoading: contactStatsLoading, refetch: fetchStats } = useQuery({
    queryKey: ["contactstats"],
    queryFn: () => getContactStats(),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contact", search, activeTab, page],
    queryFn: () => getContact({ search, activeTab, page }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: contactbyId, isLoading: contactbyIdLoading, refetch: fetchById } = useQuery({
    queryKey: ["contactbyId", selectedId],
    queryFn: () => getContactById(selectedId),
    enabled: !!selectedId,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      const response = await axiosinstance.delete(`/contact/${selectedId}`)
      if (response?.status === 200 || response?.status === 201) {
        SuccessToast(response?.data?.message)
        setIsDelete(false)
        queryClient.refetchQueries(["contact", search, "All"])
        fetchStats()
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message)
    } finally {
      setDeleteLoading(false)
    }
  }


  const handleTabChange = (tab) => {
    setActiveTab(tab)

  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div className="w-full min-h-screen p-4 font-sans">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BiSolidNotification className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                Contact Query Management
              </span>
            </div>



            <p className="text-sm px-9 text-gray-500">
              Manage and respond to customer inquiries
            </p>
          </div>
        </div>
      </div>

      <div className=" border border-white rounded-xl p-3 shadow-sm">
        <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
            {contactStatsLoading ? (
              <StatsSkeleton count={3} />
            ) : (

              [
                { label: "New Queries", value: contactstats?.newQueries },
                { label: "Replied", value: contactstats?.repliedQueries },
                { label: "This Week", value: contactstats?.thisWeekQueries },
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
              ))


            )}
          </div>
        </div>


        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-2">
          <div className="flex bg-[#eaeaf8] p-1 rounded-xl w-fit ">
            {["All", "Replied"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400"
            />
          </div>
        </div>


        <div className="overflow-x-auto border border-gray-200 rounded-xl">

          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
            <div className="font-semibold text-sm">Contact</div>

            {activeTab === "All" ? (
              <div className="font-semibold text-sm">Message Preview</div>
            ) : (
              <div className="font-semibold text-sm text-center">Original Message</div>
            )}

            {activeTab === "All" ? (
              <div className="font-semibold text-sm text-center">
                <div className="flex items-center justify-center gap-1 cursor-pointer">
                  Status <HiOutlineSelector />
                </div>
              </div>
            ) : (
              <div className="font-semibold text-sm text-center">Reply</div>
            )}

            <div className="font-semibold text-sm text-center">Date</div>
            <div className="font-semibold text-sm text-center">Action</div>
          </div>


          <div className="space-y-4">
            {isLoading ? (
              <TableSkeleton />
            ) : data?.data?.length === 0 ? (
              <div className="text-center p-10 ">No Data Found</div>
            ) : (
              data?.data?.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-5 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3]"
                >

                  <div className="font-medium text-[#2D3748] text-sm flex flex-col">
                    <h2 className="text-gray-900 font-semibold">{item.name}</h2>
                    <p className="text-[#302C2C] text-[14px]">{item.email}</p>
                  </div>


                  <div className="text-[#302C2C] text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {item.message}
                  </div>


                  {activeTab === "All" ? (
                    <div className="text-center mt-4">
                      <button className="bg-gray-50 border border-gray-100 px-8 py-2 rounded-xl text-sm inline-flex items-center gap-2">
                        <p
                          className={`${item.emailStatus === "Replied"
                            ? "text-green-500"
                            : "text-[#E57E25]"
                            } text-[14px]`}
                        >
                          {item.emailStatus}
                        </p>
                      </button>
                    </div>
                  ) : (
                    <div className="text-[#302C2C] text-sm text-center border-l-2 border-[#E3E3E3] break-words whitespace-pre-wrap px-2">
                      {item.reply ? (
                        item.reply
                      ) : (
                        <span className="italic">No reply yet</span>
                      )}
                    </div>
                  )}


                  <div className="text-center text-[#302C2C] text-sm py-2 mt-4">
                    {formatDate(
                      activeTab === "All" ? item.createdAt : item.updatedAt
                    )}
                  </div>


                  <div className="flex justify-center gap-4 py-2 mt-4">
                    <div
                      onClick={() => {
                        if (item.emailStatus === "Replied") {
                          setSelectedId(item?._id);
                          setViewReply(true);
                          fetchById()
                        } else {
                          setSelectedId(item?._id);
                          setViewMessage(true);
                          fetchById()

                        }
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full"
                    >
                      <img src={eye} alt="view" />
                    </div>

                    {activeTab === "All" && item.emailStatus === "Pending" && (
                      <div
                        onClick={() => {
                          setSelectedId(item?._id);
                          setViewMessage(false);
                          setReplyMessage(true);
                        }}
                        className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full"
                      >
                        <img src={sms} alt="reply" />
                      </div>
                    )}

                    <div
                      onClick={() => {

                        setSelectedId(item?._id)
                        setIsDelete(true)
                      }}
                      className="cursor-pointer p-1 w-6 h-6 hover:bg-red-100 rounded-full"
                    >
                      <img src={bin} alt="delete" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
            onPageChange={handlePageChange}
          />
        </div>
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
          contactDetail={contactbyId}
        />
      )}
      {viewReply && (
        <ReplyDetailModal
          isOpen={viewMessage}
          onClick={() => {
            setViewReply(false);
          }}
          title="Email verified"
          description="Your email has been verified successfully."
          contactDetail={contactbyId}
        />
      )}
      {replyMessage && (
        <MessageReplyModal
          isOpen={replyMessage}
          onClick={() => {
            setReplyMessage(false);
          }}
          onNext={() => {
            setReplyMessage(false);
            setIsSuccess(true);
          }}
          contactDetail={contactbyId}
        />
      )}
      {isSuccess && (
        <SuccessModal
          onClick={() => {
            setIsSuccess(false);
          }}
          title={"Mail Sent"}
          message={"Mail has been sent to user."}
        />
      )}
      {isDelete && (
        <DeleteModal
          isOpen={isDelete}
          onClick={() => {
            setIsDelete(false);
          }}
          loading={deleteloading}
          onNext={handleDelete}
          message={"Message will be deleted"}
          title={"Delete Message"}
        />
      )}
    </div>
  );
};

export default ContactForm;
