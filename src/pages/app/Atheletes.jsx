import { useState } from "react";
import { FaChevronDown, FaFootballBall } from "react-icons/fa";
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiUpload,
  FiPlus,
  FiDownload,
  FiEdit2,
} from "react-icons/fi";
import { useNavigate } from "react-router";
import AddAthleteModal from "../../components/athlete/AddAthleteModal";
import AthleteAiModal from "../../components/athlete/AthleteAiModal";
import DeleteModal from "../../components/global/DeleteModal";
import useDebounce, { useAppDispatch } from "../../lib/store/hook";
import { setAthleteId, setFormData, setMode } from "../../lib/store/feature/athleteFormSlice";
import { athleteData, mockAtheleTableData } from "../../static/mockData";
import { getAthelete, getAtheleteCount } from "../../lib/query/queryFn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { calculateAge, formatDate } from "../../lib/helpers";
import TableSkeleton from "../../components/global/TableSkeleton";
import Pagination from "../../components/global/Pagination";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import StatsSkeleton from "../../components/global/StatsSkeleton";
const ageRanges = [
  "10-20",
  "20-30",
  "30-40",
  "40-50",
  "50-60"
]

const positions = [
  "Point Guard",
  "Shooting Guard",
  "Small Forward",
  "Center",
  "Power Forward",
];
export default function Atheletes() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient()
  const [isAddAthlete, setIsAddAthlete] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [tabs, setTabs] = useState('All')
  const debouncedSearch = useDebounce(search, 500)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])

  const [archiveLoading, setArchiveLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [selectedAgeRange, setSelectedAgeRange] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("")

  // ye API me jayenge
  const [minAge, setMinAge] = useState("")
  const [maxAge, setMaxAge] = useState("")
  const [position, setPosition] = useState("")

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["athelete", page, debouncedSearch, tabs, minAge,
      maxAge,
      position],
    queryFn: () => getAthelete({
      page, search: debouncedSearch, active: tabs === "Active" ? true : tabs === "Archived" ? false : "all", minAge,
      maxAge,
      position
    }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });
  const { data: atheleteCount, isLoading: atheleteCountLoading, isError: atheleteCountisError, refetch: countrefetch } = useQuery({
    queryKey: ["atheleteCount"],
    queryFn: () => getAtheleteCount(),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };
  
  const handleApplyFilter = () => {

    if (selectedAgeRange) {
      const [min, max] = selectedAgeRange.split("-")
      setMinAge(min)
      setMaxAge(max)
    }

    setPosition(selectedPosition)
    setFilterOpen(false)
  }
  const handleResetFilter = () => {
    setSelectedAgeRange("")
    setSelectedPosition("")
    setMinAge("")
    setMaxAge("")
    setPosition("")
    refetch()
  }
  const handleTabChange = (tab) => {
    setTabs(tab)

    queryClient.invalidateQueries({
      queryKey: ["athelete"]
    })
  }
  const handleBulkArchive = async () => {

    if (selectedIds.length === 0) {
      ErrorToast("Please select athlete")
      return
    }
    setArchiveLoading(true)
    try {

      const response = await axiosinstance.post("/athlete/update/bulk/status", {
        ids: selectedIds,
        isActive: false
      })
      if (response?.status === 200 || response?.status === 201) {
        SuccessToast(response?.data?.message)
        setSelectedIds([])
        refetch()
        countrefetch()

      }

    } catch (error) {
      ErrorToast(error?.response?.data?.message)
    } finally {
      setArchiveLoading(false)
    }
  }
  const handleUnBulkArchive = async () => {

    if (selectedIds.length === 0) {
      ErrorToast("Please select athlete")
      return
    }
    setArchiveLoading(true)
    try {

      const response = await axiosinstance.post("/athlete/update/bulk/status", {
        ids: selectedIds,
        isActive: true
      })
      if (response?.status === 200 || response?.status === 201) {
        SuccessToast(response?.data?.message)
        setSelectedIds([])
        refetch()
        countrefetch()

      }

    } catch (error) {
      ErrorToast(error?.response?.data?.message)
    } finally {
      setArchiveLoading(false)
    }
  }
  const handleDelete = async () => {
    setIsDeleteLoading(true)
    try {
      const response = await axiosinstance.delete(`/athlete/${selectedId}`)
      if (response.status === 200 || response.status === 201) {
        SuccessToast(response?.data?.message)
        setIsDelete(false)
        refetch()
        countrefetch()
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message)
    } finally {
      setIsDeleteLoading(false)
    }
  }
  return (
    <div className="w-full space-y-6">

      <div className="  px-4 py-4 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaFootballBall className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                Athlete Management
              </span>
            </div>

            <p className="text-sm px-9 text-gray-500">
              Manage your application users
            </p>
          </div>


          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm  bg-[#21A366]  rounded-md text-white hover:bg-green-700">
              <FiUpload />
              <span className="text-white">Upload CSV</span>
            </button>

            <button
              // onClick={() => navigate("/app/add-athlete")}
              onClick={() => setIsAddAthlete(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-[#0085CA] text-white hover:bg-blue-700"
            >
              <FiPlus />
              <span className="text-white"> Add Athlete</span>
            </button>


          </div>
        </div>
      </div>

      <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
        <h1 className="p-2 pb-4 pt-0 font-bold">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">

          {atheleteCountLoading ? (
            <StatsSkeleton count={3} />
          ) : (
            [
              { label: "Total Athletes", value: atheleteCount?.totalAthlete },
              { label: "Active Athletes", value: atheleteCount?.activeAthlete },
              { label: "Pending Requests", value: atheleteCount?.intrestPending },
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
            ))

          )}
        </div>
      </div>




      <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30  shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4 p-2">
          <div className="flex gap-2 border border-white rounded-xl p-2 bg-[#EAEEF8] ">


            {["All", "Active", "Archived"].map((tab, i) => (
              <button
                key={i}
                className={`px-12 py-1.5 rounded-md text-sm font-medium ${tab === tabs
                  ? "bg-white text-black"
                  : "text-gray-500 hover:bg-gray-50"
                  }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border rounded-md px-3 py-1.5 text-sm text-gray-600 flex items-center"
              >
                Filter By
                <FaChevronDown className="ml-2" />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50 space-y-4">

                  {/* Age Range */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Age Range
                    </label>

                    <select
                      value={selectedAgeRange}
                      onChange={(e) => setSelectedAgeRange(e.target.value)}
                      className="w-full mt-1 border rounded-md px-2 py-1"
                    >
                      <option value="">Select Age</option>

                      {ageRanges.map((age, i) => (
                        <option key={i} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Position
                    </label>

                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full mt-1 border rounded-md px-2 py-1"
                    >
                      <option value="">Select Position</option>

                      {positions.map((pos, i) => (
                        <option key={i} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={handleResetFilter}
                      className="px-3 py-1 text-sm border rounded-md"
                    >
                      Reset
                    </button>

                    <button
                      onClick={handleApplyFilter}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
                    >
                      Apply
                    </button>
                  </div>

                </div>
              )}
            </div>
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
          </div>
        </div>


        <div className="flex justify-end p-2">
          {tabs === "Archived" ? (
            <button
              onClick={handleUnBulkArchive}
              className="border rounded-md px-3 py-1.5 text-sm text-green-600"
            >
              {archiveLoading ? "Unarchiving..." : "Unarchive"}
            </button>
          ) : (
            <button
              onClick={handleBulkArchive}
              className="border rounded-md px-3 py-1.5 text-sm text-gray-600"
            >
              {archiveLoading ? "Archiving..." : "Archive"}
            </button>
          )}
        </div>


        <div className="overflow-x-auto border rounded-xl mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-black border-b">
                <th className="px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === data?.data?.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(data?.data?.map((a) => a._id))
                      } else {
                        setSelectedIds([])
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </th>
                <th className="px-5 py-3">Athlete</th>
                <th className="py-3">Position</th>
                <th className="py-3">Age</th>
                <th className="py-3">Interests</th>
                <th className="py-3">Status</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <TableSkeleton />
              ) : (isError ? (
                <div className="col-span-3 text-center text-red-500">
                  Error loading athlete data
                </div>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No athlete found
                  </td>
                </tr>) :
                data?.data?.map((athlete, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(athlete._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds((prev) => [...prev, athlete._id])
                          } else {
                            setSelectedIds((prev) =>
                              prev.filter((id) => id !== athlete._id)
                            )
                          }
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </td>
                    <td className="px-5 py-4 flex items-center gap-3">

                      <div>
                        <img src={athlete?.basicInfo?.image} alt={athlete?.basicInfo?.name} className="w-9 h-9 rounded-full object-cover" />
                      </div>
                      <span className="font-medium text-gray-800">
                        {athlete?.basicInfo?.name}
                      </span>
                    </td>

                    <td>{athlete?.basicInfo?.position}</td>
                    <td>{calculateAge(athlete?.basicInfo?.dob) || "--------"}</td>
                    <td>{athlete?.basicInfo?.intrestCount}</td>

                    <td>
                      <span
                        className={`px-3 py-3 text-xs rounded-md font-medium ${athlete?.isActive
                          ? "bg-white text-green-600"
                          : "bg-white text-orange-600"
                          }`}
                      >
                        ● {athlete?.isActive ? "Active" : "Archived"}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-4 text-lg text-text-black">
                        <FiEye
                          onClick={() => {
                            navigate(`/app/athlete-details/${athlete._id}`, { state: { atheleteCount } })
                          }}
                          className="cursor-pointer hover:text-gray-700"
                        />

                        <FiDownload className="cursor-pointer hover:text-gray-700" />
                        <FiEdit2 onClick={() => {
                          dispatch(setFormData(athlete))
                          dispatch(setMode("edit"))
                          dispatch(setAthleteId(athlete._id))

                          navigate("/app/add-athlete")
                        }} className="cursor-pointer hover:text-gray-700" />

                        <FiTrash2
                          onClick={() => {

                            setSelectedId(athlete?._id)

                            setIsDelete(true)
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
        onPageChange={handlePageChange}
      />
      {isAddAthlete && (
        <AddAthleteModal
          onClick={() => setIsAddAthlete(false)}
          handleAiModal={() => {
            setIsAddAthlete(false);
            setAiModal(true);
          }}
        />
      )}
      {aiModal && <AthleteAiModal onClick={() => setAiModal(true)} />}
      {isDelete && (
        <DeleteModal
          loading={isDeleteLoading}
          isOpen={isDelete}
          onClick={() => {
            setIsDelete(false);
          }}
          onNext={handleDelete}
          message={"Athlete will be deleted"}
          title={"Delete Athlete"}
        />
      )}
    </div>
  );
}
