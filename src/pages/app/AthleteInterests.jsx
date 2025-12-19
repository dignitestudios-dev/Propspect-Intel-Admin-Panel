
import React, { useState } from "react";
import {
  FiArrowLeft, FiMail, FiMessageSquare, FiMoreHorizontal
} from "react-icons/fi";

export default function AthleteInterests() {
  // Mock data representing the requests in the image
  const requests = [
    {
      id: 1,
      name: "Coach Sarah Williams",
      status: "Pending",
      date: "1/15/2024",
      email: "sarah.williams@university.edu",
      message: "Interested in recruiting for our program. Impressive stats!",
      type: "Pending"
    },
    {
      id: 2,
      name: "Tom Miller",
      status: "Declined",
      date: "1/20/2024",
      email: "tom@scouting.com",
      message: "Would like to discuss scholarship opportunities.",
      type: "Declined"
    }
  ];

  return (
    <div className="w-full min-h-screen p-6 font-sans space-y-6 ">
      
      {/* Top Back Navigation */}
      <div className="flex items-center gap-2 text-lg font-bold text-black cursor-pointer">
        <FiArrowLeft />
        <span>Interests</span>
      </div>

      {/* Header Profile Info */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="athlete"
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Liam O’Sullivan</h2>
          <span className="px-3 py-1 text-xs border border-purple-300 text-purple-600 rounded-full font-medium">
            ● Rookie
          </span>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 bg-[#E2E8F0] bg-opacity-60  border border-gray-300 rounded-xl p-4">
       {[
            { label: "Total Requests", value: "2" },
            { label: "Pending", value: "1" },
            { label: "Updates", value: "1" },
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

      {/* Interest Requests Section */}
      <div className="space-y-6">
        
        {requests.map((req) => (
          <div 
            key={req.id} 
            className=" rounded-2xl border-2 border-white shadow-sm overflow-hidden"
          >
            {/* Card Header Row */}
                    <h3 className="text-md font-bold text-gray-800 p-4">Interest Requests</h3>
                    
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-50 ml-2 mr-2 ">
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FiMessageSquare size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{req.name}</span>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Requested on {req.date}</p>
                </div>
              </div>

              {/* Action Buttons - only for Pending */}
              <div className="flex items-center gap-3">
                {req.status === "Pending" ? (
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

            {/* Card Body - Contact & Message */}
              <div className="p-5 space-y-4">

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiMail className="text-black" />
                <span>{req.email}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl p-4 shadow-inner text-sm text-gray-600 leading-relaxed italic">
                                <FiMail className="text-black" />

                {req.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Reusable Sub-Components */

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
    <p className="text-sm text-gray-500 mb-2">{label}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-orange-50 text-orange-500 border-orange-100",
    Declined: "bg-red-50 text-red-500 border-red-100",
    Approved: "bg-green-50 text-green-500 border-green-100",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};