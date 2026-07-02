import { FiPlus, FiSearch } from "react-icons/fi";
import { BiSolidNotification } from "react-icons/bi";
import { bin, NoImageUpload, pen } from "../../assets/export";
import { useEffect, useState } from "react";
import CreateSchoolModal from "../../components/app/SchoolManagement/CreateSchoolModal";
import EditSchoolModal from "../../components/app/SchoolManagement/EditSchoolModal";
import DeleteModal from "../../components/global/DeleteModal";
import SuccessModal from "../../components/global/SuccessModal";
import { useQuery } from "@tanstack/react-query";
import { getSchool } from "../../lib/query/queryFn";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import TableSkeleton from "../../components/global/TableSkeleton";
import Pagination from "../../components/global/Pagination";
import useDebounce from "../../lib/store/hook";

export default function SchoolManagement() {
  const [editMode, setEditMode] = useState('')
  const [addSchoolModal, setAddSchoolModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");
  const [sortByName, setSortByName] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const [subject, setSubject] = useState(editMode?.name || '');
  const [logo, setLogo] = useState(editMode?.logo ? { src: editMode.logo, name: "Logo.png", size: "2 mb" } : null);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["school", page, debouncedSearch, sortByName],
    queryFn: () =>
      getSchool({
        page,
        search: debouncedSearch,
        sort: sortByName,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });



  const handleDelete = async (deleteId) => {

    setDeleteLoading(true)
    try {
      const response = await axiosinstance.delete(`/school/${deleteId}`)
      if (response?.status === 200) {
        SuccessToast(response?.data?.message)
        setIsDelete(false)
        refetch()

      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message)
    } finally {
      setDeleteLoading(false)
    }
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };
  useEffect(() => {
    if (editMode) {
      setSubject(editMode.name || "");
      setLogo(editMode.logo ? { src: editMode.logo, name: "Logo.png", size: "2 mb" } : null);
    }
  }, [editMode]);
  return (
    <div className="w-full min-h-screen  p-4 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BiSolidNotification className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                School Management
              </span>
            </div>

            {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
                     Athlete Management
                   </h1> */}

            <p className="text-sm px-9 text-gray-500">
              Manage Schools & Logos.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="sortName"
              type="checkbox"
              checked={sortByName}
              onChange={(e) => {
                setSortByName(e.target.checked)
                setPage(1)
              }}
              className="w-4 h-4"
            />
            <label htmlFor="sortName" className="text-sm">
              Sort by Name (A-Z)
            </label>
          </div>
          <button
            onClick={() => {
              setEditMode(null);
              setSubject("")
              setLogo(null)
              setAddSchoolModal(true)
            }}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors shadow-sm"
          >
            <FiPlus strokeWidth={3} />
            <span>Add School</span>
          </button>
        </div>
      </div>

      {/* Main Card Container */}
      <div className=" border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
            <div className="font-semibold text-sm">School Name</div>
            <div className="font-semibold text-sm"></div>
            <div className="font-semibold text-sm">Logo</div>
            <div className="font-semibold text-sm ">Action</div>
          </div>

          <div className="space-y-4">
            {isLoading ? (<TableSkeleton />)
              : data?.data?.length === 0 ? <div className="text-center p-10">No Data Found</div> :
                data?.data?.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-4 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
                  >
                    <div className="font-medium text-[#2D3748] text-sm py-2 mt-4">
                      {item?.name}
                    </div>
                    <div className="font-medium text-[#2D3748] text-sm py-2 mt-4"></div>
                    <div className="">
                      <img
                        src={item?.logo || NoImageUpload}
                        className="rounded-full w-16 h-16 object-cover"

                      />
                    </div>
                    <div className="flex gap-4 text-gray-400 py-2 mt-4">
                      <div
                        className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors"
                        onClick={() => {
                          setEditMode(item)
                          setAddSchoolModal(true)
                        }}
                      >
                        <img src={pen} alt="edit" />
                      </div>
                      <div
                        onClick={() => {
                          setDeleteId(item?._id)
                          setIsDelete(true)
                        }}
                        className="cursor-pointer p-1 w-6 h-6 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <img src={bin} alt="delete" />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <Pagination
          pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
          onPageChange={handlePageChange}
        />
      </div>
      {addSchoolModal && (
        <CreateSchoolModal
          editMode={editMode}
          setPage={setPage}
          isOpen={addSchoolModal}
          onNext={() => {
            setAddSchoolModal(false);
            setIsSuccess(true);
          }}
          setSubject={setSubject}
          subject={subject}
          logo={logo}
          setLogo={setLogo}
          onClick={() => {
            setAddSchoolModal(false);
          }}
          title="Email verified"
          description="Your email has been verified successfully."
        />
      )}
      {isSuccess && (
        <SuccessModal
          onClick={() => {
            setIsSuccess(false);
          }}
          message={`School Has Been ${editMode?._id ? "Updated" : "Added"}`}
          title={`School  ${editMode?._id ? "Updated" : "Added"}.`}
        />
      )}
      {selectedSchool && (
        <EditSchoolModal
          isOpen={!!selectedSchool}
          onClick={() => setSelectedSchool(null)}
          school={selectedSchool}
        />
      )}
      {isDelete && (
        <DeleteModal
          isOpen={isDelete}
          onClick={() => {
            setIsDelete(false);
          }}
          loading={deleteLoading}
          onNext={() => handleDelete(deleteId)}
          message={"School will be deleted"}
          title={"Delete School"}
        />
      )}
    </div>
  );
}
