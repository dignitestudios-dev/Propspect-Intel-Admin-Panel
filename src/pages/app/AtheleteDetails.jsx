import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiEdit,
  FiTrash2,
  FiArchive,
  FiUser,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";
import { FiMail, FiPhone } from "react-icons/fi";
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import Overview from "../../components/athletedetails/Overview";
import Athlete from "../../components/athletedetails/Athlete";
import Stats from "../../components/athletedetails/Stats";
import Education from "../../components/athletedetails/Education";
import Achievements from "../../components/athletedetails/Achievements";
import Media from "../../components/athletedetails/Media";
import { Users } from "lucide-react";
import { TbPdf } from "react-icons/tb";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAtheleteById } from "../../lib/query/queryFn";
import {
  calculateAge,
  formatAthleteForCSV,
  formatDate,
  formatPhoneNumber,
} from "../../lib/helpers";
import { useAppDispatch } from "../../lib/store/hook";
import {
  setAthleteId,
  setFormData,
  setMode,
} from "../../lib/store/feature/athleteFormSlice";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import DeleteModal from "../../components/global/DeleteModal";
import DetailPageSkeleton from "../../components/global/DetailPageSkeleton";
import { Emptyimg } from "../../assets/export";

export default function AthleteDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const query = useQueryClient();
  const location = useLocation();
  const atheleteCount = location.state?.atheleteCount;
  const [activeTab, setActiveTab] = useState("Overview");
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const {
    data: athlete,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["atheleteid", id],
    queryFn: () => getAtheleteById(id),
    enabled: !!id,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const handleDownloadCSV = () => {
    if (!athlete) return;

    const data = formatAthleteForCSV(athlete);

    const headers = Object.keys(data);
    const values = Object.values(data);

    const csv = [
      headers.join(","),
      values.map((v) => `"${v ?? ""}"`).join(","),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${athlete.basicInfo?.name}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleBulkArchive = async () => {
    setArchiveLoading(true);

    try {
      const response = await axiosinstance.post("/athlete/update/bulk/status", {
        ids: [id],
        isActive: !athlete?.isActive,
      });

      if (response?.status === 200 || response?.status === 201) {
        SuccessToast(response?.data?.message);
        query.invalidateQueries({ queryKey: ["atheleteCount"] });
        query.invalidateQueries({ queryKey: ["athelete"] });
        query.invalidateQueries({ queryKey: ["adminstats"] });

        refetch();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setArchiveLoading(false);
    }
  };
  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      const response = await axiosinstance.delete(`/athlete/${id}`);
      if (response.status === 200 || response.status === 201) {
        SuccessToast(response?.data?.message);
        setIsDelete(false);
        navigate("/app/athletes");
        query.invalidateQueries({ queryKey: ["athelete"] });
        query.invalidateQueries({ queryKey: ["atheleteCount"] });
        query.invalidateQueries({ queryKey: ["adminstats"] });
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setIsDeleteLoading(false);
    }
  };
  const getStatusConfig = (status) => {
    if (typeof status !== "string") {
      return "bg-gray-100 text-gray-600";
    }

    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "contacted":
        return "bg-blue-100 text-blue-700";
      case "approved":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  return (
    <div className="w-full min-h-screen p-6 font-sans space-y-6">
      {isLoading ? (
        <DetailPageSkeleton />
      ) : (
        <>
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-lg font-bold text-black cursor-pointer"
          >
            <FiArrowLeft />
            <span>Athlete Details</span>
          </div>

          <div className=" rounded-2xl p-2 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={athlete?.basicInfo?.image || Emptyimg}
                  alt="athlete"
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 max-w-[500px]">
                      <h2
                        className="text-xl font-semibold text-gray-900 break-words"
                        title={athlete?.basicInfo?.name}
                      >
                        {athlete?.basicInfo?.name || "N/A"}
                      </h2>
                    </div>

                    {athlete?.basicInfo?.status?.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {athlete?.basicInfo?.status?.map((tag, idx) => {
                          const colors = [
                            { bg: "#FF3A44", text: "#fff" },
                            { bg: "#3FB185", text: "#fff" },
                            { bg: "#7A4D8B", text: "#fff" },
                          ];

                          const color = colors[idx % colors.length];

                          return (
                            <span
                              key={idx}
                              className="py-1 px-2 text-[10px] rounded-full font-semibold"
                              style={{
                                border: `1px solid ${color.bg}`,
                                color: "black",
                              }}
                            >
                              {tag.toUpperCase()}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="py-1 px-2 text-[10px] rounded-full bg-gray-200 text-gray-500 font-semibold">
                        N/A
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleDownloadCSV}
                    className="mt-2 border-2  border-gray-300 p-2 rounded-lg flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <TbPdf />
                    Download CSV
                    <FiDownload />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 ">
                <button
                  onClick={() =>
                    navigate(`/app/athlete-interests/${athlete._id}`, {
                      state: { athlete, atheleteCount },
                    })
                  }
                  className="px-4 py-2 font-bold border-2 border-gray-200 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Users /> Interests ({athlete?.basicInfo?.intrestCount})
                </button>
                <button
                  onClick={() => setIsDelete(true)}
                  className="px-4 py-2 border font-bold border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 flex items-center gap-2"
                >
                  <FiTrash2 />
                  Delete
                </button>
                <button
                  onClick={handleBulkArchive}
                  className="px-4 py-2 font-bold border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <FiArchive />
                  {archiveLoading
                    ? "Processing..."
                    : athlete?.isActive
                      ? "Archive"
                      : "Unarchive"}
                </button>
                <button
                  onClick={() => {
                    dispatch(setFormData(athlete));
                    dispatch(setMode("edit"));
                    dispatch(setAthleteId(athlete._id));

                    navigate("/app/athleteform");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"
                >
                  <FiEdit />
                  Edit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#E2E8F0] bg-opacity-60  border border-gray-60  rounded-xl p-4">
              {[
                { label: "Age", value: calculateAge(athlete?.basicInfo?.dob) },
                {
                  label: "Height",
                  value: `${athlete?.basicInfo?.height}` || "N/A",
                },
                {
                  label: "Weight",
                  value: `${athlete?.basicInfo?.weight} lbs` || "N/A",
                },
                {
                  label: "Position",
                  value: athlete?.basicInfo?.position || "N/A",
                },
              ]?.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl space-y-3 p-4 text-center shadow-md bg-[#FFFFFF4D] border-white border"
                >
                  <p className="text-[16px] text-black">{item.label}</p>
                  <p className="text-[28px] font-bold text-gray-900 mt-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 shadow-sm space-y-4 bg-white bg-opacity-25 border-2 border-white rounded-2xl">
            <h3 className="text-sm font-semibold text-gray-700">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {/* <Info label="Email" value={athlete?.basicInfo?.email || "N/A"} /> */}
              <Info
                label="Phone"
                value={`${formatPhoneNumber(athlete?.basicInfo?.phone) || "N/A"}`}
              />
              <Info label="State" value={athlete?.basicInfo?.state || "N/A"} />
              <Info
                label="Date of Birth"
                value={formatDate(athlete?.basicInfo?.dob) || "N/A"}
              />
            </div>
          </div>
          <div className="flex gap-4 bg-[#E2E8F0]  border border-gray-60 bg-opacity-30 rounded-2xl p-2">
            {[
              "Overview",
              "Family",
              "Athlete",
              // "Stats",
              // "Education",
              // "Achievements",
              // "Media",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-grow px-4 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === tab
                    ? "bg-white text-[#1A202C]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === "Family" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                <FamilyCard
                  title="Parents"
                  icon={<FiHeart className="text-red-500" />}
                >
                  <div className="space-y-3">
                    <DataRow
                      label="Mother"
                      value={athlete?.family?.motherName || "N/A"}
                    />
                    <DataRow
                      label="Occupation"
                      value={athlete.family.motherOccupation || "N/A"}
                    />
                    <DataRow
                      label="Contact"
                      value={`${athlete?.family?.motherContact ? `+1 ${formatPhoneNumber(athlete?.family?.motherContact)}` : "N/A"}`}
                    />
                    <DataRow
                      label="DOB"
                      value={formatDate(athlete?.family?.motherDob) || "N/A"}
                    />
                    <div className="pt-2 border-t border-gray-100 space-y-3">
                      <DataRow
                        label="Father"
                        value={athlete?.family?.fatherName || "N/A"}
                      />
                      <DataRow
                        label="Occupation"
                        value={athlete?.family?.fatherOccupation || "N/A"}
                      />
                      <DataRow
                        label="Contact"
                        value={`${athlete?.family?.fatherContact ? `+1 ${formatPhoneNumber(athlete?.family?.fatherContact)}` : "N/A"}`}
                      />
                      <DataRow
                        label="DOB"
                        value={formatDate(athlete?.family?.fatherDob) || "N/A"}
                      />
                    </div>
                  </div>
                </FamilyCard>

                <FamilyCard
                  title="Siblings"
                  icon={<FiUser className="text-green-500" />}
                >
                  <div className="space-y-3">
                    {athlete?.family?.siblings.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No siblings information available
                      </p>
                    ) : (
                      athlete?.family?.siblings?.map((sibling) => (
                        <div
                          key={sibling.id}
                          className="border-b border-gray-100 pb-2"
                        >
                          <DataRow label="Name" value={sibling.name || "N/A"} />
                          <DataRow
                            label="Relation"
                            value={sibling.type || "N/A"}
                          />
                          <DataRow
                            label="DOB"
                            value={formatDate(sibling.dob) || "N/A"}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </FamilyCard>

                <FamilyCard
                  title="Key Influences"
                  icon={<FiTrendingUp className="text-blue-500" />}
                >
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {athlete?.family?.keyInfluences || "N/A"}
                  </p>
                </FamilyCard>
              </div>
            )}

            {activeTab === "Overview" && (
              <Overview athlete={athlete?.overview} />
            )}

            {activeTab === "Athlete" && <Athlete athlete={athlete?.athlete} />}
            {activeTab === "Stats" && <Stats athlete={athlete?.stats} />}
            {activeTab === "Education" && (
              <Education athlete={athlete?.education} />
            )}
            {activeTab === "Achievements" && (
              <Achievements athlete={athlete?.achievements} />
            )}
            {activeTab === "Media" && <Media athlete={athlete?.media} />}
          </div>
        </>
      )}

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

const Info = ({ label, value }) => {
  let IconComponent;

  switch (label) {
    case "Email":
      IconComponent = FiMail;
      break;
    case "Phone":
      IconComponent = FiPhone;
      break;
    case "Hometown":
      IconComponent = HiLocationMarker;
      break;
    case "Date of Birth":
      IconComponent = HiCalendar;
      break;
    default:
      IconComponent = null;
  }

  return (
    <div className="rounded-xl p-4 bg-white bg-opacity-25 shadow-sm border-white border-2">
      <div className="flex flex-col items-left gap-1">
        <div className="flex items-left gap-2">
          {IconComponent && <IconComponent className="text-gray-500" />}
          <p className="text-xs text-gray-500">{label}</p>
        </div>
        <p className="font-medium text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
};

const FamilyCard = ({ title, icon, children }) => (
  <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-2xl border-2 border-white p-6 shadow-sm min-h-[250px]">
    <div className="flex items-center gap-2 mb-6">
      {icon}
      <h4 className="font-bold text-gray-800">{title}</h4>
    </div>
    {children}
  </div>
);

const DataRow = ({ label, value }) => (
  <div className="flex justify-between items-start text-sm py-1">
    <span className="text-gray-400 w-1/3">{label}:</span>
    <span className="text-gray-800 font-medium w-2/3 text-right">{value}</span>
  </div>
);
