
import React, { useState } from "react";
import {
  FiArrowLeft, FiMail, FiMessageSquare, FiMoreHorizontal
} from "react-icons/fi";
import { getInterestById } from "../../lib/query/queryFn";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { formatDate } from "../../lib/helpers";

export default function AthleteInterests() {
  const { id } = useParams();
  const navigate = useNavigate()
  const location = useLocation();
  const athlete = location.state?.athlete;
  const atheleteCount = location.state?.atheleteCount;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Interest", id],
    queryFn: () => getInterestById(id),
    enabled: !!id,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="w-full min-h-screen p-6 font-sans space-y-6 ">

      {/* Top Back Navigation */}
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-lg font-bold text-black cursor-pointer">
        <FiArrowLeft />
        <span>Interests</span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={athlete?.basicInfo?.image || "https://i.pravatar.cc/100?img=12"}
          alt="athlete"
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">{athlete?.basicInfo?.name || "N/A"}</h2>
          <span className="px-3 py-1 text-xs border border-purple-300 text-purple-600 rounded-full font-medium">
            ● {athlete?.basicInfo?.status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 bg-[#E2E8F0] bg-opacity-60  border border-gray-300 rounded-xl p-4">
        {[
          { label: "Total Requests", value: atheleteCount?.totalAthlete },
          { label: "Pending", value: atheleteCount?.intrestPending },
          { label: "Updates", value: atheleteCount?.activeAthlete },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl space-y-3 p-2 text-center shadow-md bg-[#FFFFFF4D] border-white border-2"
          >              <p className="text-[16px] text-black">{item.label}</p>
            <p className="text-[28px] font-bold text-gray-900 mt-1">
              {item.value}
            </p>             </div>
        ))}
      </div>
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-white bg-gray-100 shadow-sm p-5 space-y-4"
            >
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
              <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-10">Error loading data</div>
      ) : data?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No interest found</div>
      ) : (
        data.map((req) => (
          <div key={req._id || req.user?.id} className="space-y-6">
            <div className="rounded-2xl border-2 border-white shadow-sm overflow-hidden">
              {/* Card Header */}
              <h3 className="text-md font-bold text-gray-800 p-4">Interest Requests</h3>

              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-50 mx-2">
                <div className="flex items-center gap-3">
                  <img
                    src={req?.user?.profilePicture || "https://i.pravatar.cc/100?img=12"}
                    alt={req?.user?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">{req?.user?.name}</span>
                      <StatusBadge status={req?.status} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Requested on {formatDate(req.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {req?.status?.toLowerCase() === "pending" ? (
                    <>
                      <button className="px-6 py-2 bg-[#0085CA] text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
                        Update
                      </button>
                      <button className="px-6 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                    </>
                  ) : (
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                      <FiMoreHorizontal size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiMail className="text-black" />
                  <span>{req?.user?.email}</span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl p-4 shadow-inner text-sm text-gray-600 leading-relaxed italic">
                  <FiMessageSquare className="text-black" />
                  {req?.description}
                </div>
              </div>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const styles = {
    pending: "bg-orange-50 text-orange-500 border-orange-100",
    declined: "bg-red-50 text-red-500 border-red-100",
    approved: "bg-green-50 text-green-500 border-green-100",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${styles[s]}`}>
      {status}
    </span>
  );
};