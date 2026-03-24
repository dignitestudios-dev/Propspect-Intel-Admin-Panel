import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUsers } from "../../../lib/query/queryFn";
import useDebounce from "../../../lib/store/hook";
import Pagination from "../../global/Pagination";
import { notificationSchema } from "../../../schema/notiSchema/NotiSchema";
import { useFormik } from "formik";
import axiosinstance from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";

const CreatePushNotificationModal = ({ onClick, onNext }) => {
  const [activeTab, setActiveTab] = useState("new");
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: () => getUsers({ page, search: debouncedSearch }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      userId: null,
    },
    validationSchema: notificationSchema,
    onSubmit: async (values) => {
      if (activeTab === "user" && !selectedUser?._id) {
        ErrorToast("Please select user first");
        return;
      }
      const payload = {
        title: values.title,
        description: values.description,
        notificationType: activeTab === "new" ? "All" : "Specific",
        ...(activeTab === "user" && { receiver: selectedUser?._id }),
      };
      setLoading(true)
      try {
        const response = await axiosinstance.post('/notification', payload)
        if (response?.status === 200 || response?.status === 201) {
          SuccessToast(response?.data?.message)
          queryClient.invalidateQueries({ queryKey: ["notification"] });

          onNext()

        }
      } catch (err) {
        console.log(err)
        ErrorToast(err?.response?.data?.message)
      } finally {
        setLoading(false)
      }

    },
  });

  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[515px]  ">
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">
            Send Notification
          </p>
          <div
            className="flex justify-between items-center pb-2 "
            onClick={onClick}
          >
            <span className="cursor-pointer rounded-sm p-[2px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 font-light text-gray-400 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center lg:h-auto md:h-screen border-[1px] border-[#E3E3E3] rounded-xl p-2">
          {/* Tab Buttons */}
          <div className="flex justify-between items-center w-full gap-2">
            <button
              onClick={() => setActiveTab("new")}
              className={`w-full px-5 py-2.5 rounded-lg font-semibold transition-colors ${activeTab === "new"
                ? "bg-[#0085CA] text-white hover:bg-[#0087cad4]"
                : "bg-transparent border border-[#E3E3E3] text-[#302C2C]"
                }`}
            >
              New Notification
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`w-full px-5 py-2.5 rounded-lg font-semibold transition-colors ${activeTab === "user"
                ? "bg-[#0085CA] text-white hover:bg-[#0087cad4]"
                : "bg-transparent border border-[#E3E3E3] text-[#302C2C]"
                }`}
            >
              Specific User
            </button>
          </div>

          {/* Conditional Content */}
          <div className="w-full overflow-auto">
            {activeTab === "user" && (
              <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">

                <p className="text-sm text-[#302C2C] font-light">
                  Search For User
                </p>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search User Here"
                  className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent"
                />
                {showDropdown && (
                  <div className="bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                    {isLoading ? (
                      <div className="p-2 text-sm">Loading...</div>
                    ) : data?.data?.length > 0 ? (
                      data.data.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => {
                            setSelectedUser(user)
                            setSearch(user.name)
                            setShowDropdown(false)
                          }}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {user.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">No users found</div>
                    )}
                    <div className="mb-2">

                      <Pagination
                        pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Notification Title */}
            <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">
              <p className="text-sm text-[#302C2C] font-light">
                Notification Title
              </p>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Enter title here"
                className="w-full mt-2 px-1 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent"
              />
            </div>
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.title}
              </p>
            )}

            {/* Description */}
            <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full h-[120px]">
              <p className="text-sm text-[#302C2C] font-light">Description</p>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Enter description here"
                className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent h-[70px] resize-none"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full mt-4 gap-2">
            <button
              disabled={loading}
              onClick={formik.handleSubmit}
              className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors"
            >
              {loading ? "Sending....." : "Send"}
            </button>
            <button className="w-full px-5 py-2.5 rounded-md text-[#302C2C] border-[1px] border-[#E3E3E3]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePushNotificationModal;
