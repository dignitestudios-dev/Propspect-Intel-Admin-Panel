import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiEdit,
  FiTrash2,
  FiArchive,
  FiUser,
  FiHeart,
  FiTrendingUp
} from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { FiMail, FiPhone } from 'react-icons/fi'; // Import Email and Phone icons
import { HiLocationMarker, HiCalendar } from 'react-icons/hi'; // Import Location and Calendar icons
import Overview from "../../components/athletedetails/Overview";
import Athlete from "../../components/athletedetails/Athlete";
import Stats from "../../components/athletedetails/Stats";
import Education from "../../components/athletedetails/Education";
import Achievements from "../../components/athletedetails/Achievements";
import Media from "../../components/athletedetails/Media";
import { User, Users } from "lucide-react";
import { FcDocument } from "react-icons/fc";
import { TbPdf } from "react-icons/tb";
import { useNavigate } from "react-router";

export default function AthleteDetails() {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen p-6 font-sans space-y-6">

      {/* Top Back */}
     {/* Top Back Navigation */}
           <div className="flex items-center gap-2 text-lg font-bold text-black cursor-pointer">
             <FiArrowLeft />
             <span>Athlete Details</span>
           </div>

      {/* Header Card */}
      <div className=" rounded-2xl p-2 space-y-6">

        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Athlete Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="athlete"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Liam O’Sullivan
                </h2>
                <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full">
                  Rookie
                </span>
              </div>

              <button className="mt-1 border-2 border-gray-300 p-2 rounded-lg flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                                                <TbPdf />


                Download CSV
                                <FiDownload />

              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 ">
            <button onClick={() => navigate("/app/athlete-interests")}  className="px-4 py-2 font-bold border-2 border-gray-200 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Users className="" />

              Interests (3)
            </button>
            <button className="px-4 py-2 border font-bold border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 flex items-center gap-2">
              <FiTrash2 />
              Delete
            </button>
            <button className="px-4 py-2 font-bold border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
              <FiArchive />
              Archive
            </button>
            <button  onClick={() => navigate("/app/add-athlete")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
              <FiEdit />
              Edit
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#E2E8F0] bg-opacity-60  border border-gray-60  rounded-xl p-4">
          {[
            { label: "Age", value: "23" },
            { label: "Height", value: "6’2”" },
            { label: "Weight", value: "185 lbs" },
            { label: "Position", value: "Point Guard" },
          ].map((item) => (
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

      {/* Basic Information */}
      <div className="p-6 shadow-sm space-y-4 bg-white bg-opacity-25 border-2 border-white rounded-2xl">
      <h3 className="text-sm font-semibold text-gray-700">Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <Info label="Email" value="Liam089@gmail.com" />
        <Info label="Phone" value="+1 (555) 123-4567" />
        <Info label="Hometown" value="Chicago, IL" />
        <Info label="Date of Birth" value="3/15/2002" />
      </div>
    </div>
      {/* Tabs */}
     <div className="flex gap-4 bg-[#E2E8F0]  border border-gray-60 bg-opacity-30 rounded-2xl p-2">
  {[
    "Overview",
    "Family",
    "Athlete",
    "Stats",
    "Education",
    "Achievements",
    "Media",
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


{/* Dynamic Tab Content */}
     <div className="min-h-[300px]">
  {activeTab === "Family" && (
    /* Family Content */
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
      
      {/* Parents Card */}
      <FamilyCard title="Parents" icon={<FiHeart className="text-red-500" />}>
        <div className="space-y-3">
          <DataRow label="Mother" value="Tonya Nabers" />
          <DataRow label="Occupation" value="Hair stylist, Revenue Specialist/ Part time hair stylist" />
          <DataRow label="Contact" value="423-293-9055" />
          <DataRow label="DOB" value="8/12/1962" />
          <div className="pt-2 border-t border-gray-100">
            <DataRow label="Father" value="Not In Picture" />
          </div>
        </div>
      </FamilyCard>

      {/* Siblings Card */}
      <FamilyCard title="Siblings" icon={<FiUser className="text-green-500" />}>
        <div className="space-y-3">
          <DataRow label="Sister" value="Alicia" />
          <DataRow label="DOB" value="12/12/2015" />
        </div>
      </FamilyCard>

      {/* Key Influences Card */}
      <FamilyCard title="Key Influences" icon={<FiTrendingUp className="text-blue-500" />}>
        <p className="text-sm text-gray-700 leading-relaxed">
          Malik has 2 trainers he relies heavily on, Donald Fusilier and Marlon Williams.
        </p>
      </FamilyCard>
    </div>
  )}

  {activeTab === "Overview" && <Overview />} {/* Render Overview Component */}
  
  {activeTab === "Athlete" && <Athlete />} {/* Render Athlete Component */}
  {activeTab === "Stats" && <Stats />} {/* Render Athlete Component */}
  {activeTab === "Education" && <Education />} {/* Render Education Component */}
    {activeTab === "Achievements" && <Achievements />} {/* Render Achievements Component */}
    {activeTab === "Media" && <Media />} {/* Render Achievements Component */}

</div>

    </div>
  );
}

      {/* Strength / Weakness */}
       
   

/* Reusable Components */

const Info = ({ label, value }) => {
  let IconComponent;

  // Assign the appropriate icon based on the label
  switch (label) {
    case 'Email':
      IconComponent = FiMail;
      break;
    case 'Phone':
      IconComponent = FiPhone;
      break;
    case 'Hometown':
      IconComponent = HiLocationMarker;
      break;
    case 'Date of Birth':
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

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h4 className="text-sm font-semibold text-blue-600 mb-4 uppercase">
      {title}
    </h4>
    {children}
  </div>
);

const List = () => (
  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
    <li>Strong ball handling and court vision.</li>
    <li>High basketball IQ and leadership.</li>
    <li>Quick first step and agility.</li>
    <li>Consistent mid-range shooting.</li>
    <li>Excellent defensive anticipation.</li>
  </ol>
);

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


const AthleticBox = ({ title, icon, children }) => (
  <div className="bg-white bg-opacity-25  pt-4  border-2 border-white rounded-2xl p-5">
    {/* HEADER */}
    

    {/* INNER CONTENT */}
    <div className="bg-white bg-opacity-25 p-4 pt-4 rounded-xl border-2 border-white  shadow-sm">
      <div className="flex items-center mb-4">
      <div className="flex items-center text-lg font-semibold text-gray-900">
        {icon}
        <span className="ml-2">{title}</span>
      </div>
    </div>
      {children}
    </div>
  </div>
);

