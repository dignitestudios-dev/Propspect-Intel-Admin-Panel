import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import BasicInfo from "../../components/athlete/BasicInfo";
import Family from "../../components/athlete/Family";
import Athlete from "../../components/athlete/Athlete";
import Overview from "../../components/athlete/Overview";
import Stats from "../../components/athlete/Stats";
import Education from "../../components/athlete/Education";
import Achievements from "../../components/athlete/Achievements";
import Media from "../../components/athlete/Media";
import SuccessModal from "../../components/global/SuccessModal";
import { useAppSelector } from "../../lib/store/hook";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const TABS = [
  "Basic Info",
  "Family",
  "Athlete",
  "Overview",
  "Stats",
  "Education",
  "Achievements",
  "Media",
];

export default function AthleteFormManager() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [athleteCreated, setAthleteCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitCurrentForm, setSubmitCurrentForm] = useState(() => () => { });
  const formData = useAppSelector((s) => s.athleteForm.formData);
  const mode = useAppSelector((s) => s.athleteForm.mode);
  const atheletId = useAppSelector((s) => s.athleteForm.athleteId);
  const [successType, setSuccessType] = useState("");
  const handleNext = () => {
    const currentIndex = TABS.indexOf(activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1]);
    } else {
      setAthleteCreated(true);
    }
  };

  const handlePrevious = () => {
    const currentIndex = TABS.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1]);
    }
  };
  const handleCreate = async () => {
    const fd = new FormData();

    try {
      setLoading(true);

      Object.entries(formData.basicInfo).forEach(([key, value]) => {
        if (key !== "image") {
          fd.append(`basicInfo[${key}]`, value ?? "");
        }
      });

      if (formData.basicInfo.image instanceof File) {
        fd.append("basicInfo[image]", formData.basicInfo.image);
      }

      Object.entries(formData.family).forEach(([key, value]) => {
        if (key !== "siblings") {
          fd.append(`family[${key}]`, value ?? "");
        }
      });

      formData.family.siblings?.forEach((sib, i) => {
        Object.entries(sib).forEach(([k, v]) => {
          fd.append(`family[siblings][${i}][${k}]`, v ?? "");
        });
      });

      Object.entries(formData.athlete).forEach(([key, value]) => {
        fd.append(`athlete[${key}]`, value ?? "");
      });

      formData.overview.strengths?.forEach((item, i) => {
        fd.append(`overview[strengths][${i}]`, item);
      });

      formData.overview.weaknesses?.forEach((item, i) => {
        fd.append(`overview[weaknesses][${i}]`, item);
      });

      Object.entries(formData.stats).forEach(([key, value]) => {
        fd.append(`stats[${key}]`, value ?? "");
      });

      formData.education?.forEach((edu, i) => {
        Object.entries(edu).forEach(([k, v]) => {
          fd.append(`education[${i}][${k}]`, v ?? "");
        });
      });

      formData.achievements?.forEach((ach, i) => {
        Object.entries(ach).forEach(([k, v]) => {
          fd.append(`achievements[${i}][${k}]`, v ?? "");
        });
      });
      (formData.media || []).forEach((file) => {
        if (file.file instanceof File) {
          fd.append("media", file.file);
        }
      });

      formData.mediaToDeleted.forEach((url) => {
        fd.append("mediaToDelete[]", url);
      });

      if (mode === "edit") {
        const response = await axiosinstance.put(`/athlete/${atheletId}`, fd);
        if (response.status === 200 || response.status === 201) {
          SuccessToast(response?.data?.message || "Athlete created successfully");
          setAthleteCreated(true);
          setSuccessType('Update')

        }
      } else {
        const response = await axiosinstance.post("/athlete", fd);
        if (response.status === 200 || response.status === 201) {
          SuccessToast(response?.data?.message || "Athlete created successfully");
          setAthleteCreated(true);
          setSuccessType('Created')

        }

      }

    } catch (err) {
      console.log(err, 'err')
      ErrorToast(err?.response?.data?.message || "Failed to create athlete");
    } finally {
      setLoading(false);
    }
  };
  const renderCurrentForm = () => {
    switch (activeTab) {
      case "Basic Info":
        return <BasicInfo onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Family":
        return <Family onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Athlete":
        return <Athlete onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Overview":
        return <Overview onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Stats":
        return <Stats onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Education":
        return <Education onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Achievements":
        return <Achievements onNext={handleNext} setSubmit={setSubmitCurrentForm} />;
      case "Media":
        return <Media onNext={handleCreate} setSubmit={setSubmitCurrentForm} />;
      default:
        return <BasicInfo />;
    }
  };



  return (
    <div className="min-h-screen p-2 font-sans">

      <div className="mb-6  mx-auto">
        <button className="flex items-center gap-2 text-gray-800 hover:text-black mb-2 font-bold text-lg">
          <FiArrowLeft size={18} />
          Add athlete
        </button>
        <p className="text-gray-500 text-sm ml-6">
          Create a comprehensive athlete profile with all relevant information
        </p>
      </div>
      <div className="border-2 border-gray-200 p-4 rounded-xl">

        <div className="bg-[#E3E3E3] bg-opacity-10  rounded-2xl p-2 shadow-sm border border-white flex items-center justify-between mb-8 overflow-x-auto max-w-6xl mx-auto">
          {TABS.map((tab, index) => (
            <React.Fragment key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                  ? " text-black font-extrabold"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {tab}
              </button>
              {index < TABS.length - 1 && (
                <FiChevronRight className="text-gray-300 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>


        <div className=" rounded-3xl  max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
          <div className="flex-grow">{renderCurrentForm()}</div>
        </div>


      </div>
      <div className="flex justify-center md:justify-end items-center gap-4 mt-12">
        <button className="px-10 py-3 rounded-xl font-semibold text-gray-700 bg-[#F1F5F9] hover:bg-gray-200 transition-colors">
          Cancel
        </button>

        <button
          disabled={activeTab === "Basic Info"}
          className={`px-10 py-3 rounded-xl font-semibold border border-gray-100 transition-colors ${activeTab === "Basic Info"
            ? "text-gray-200 bg-gray-50 cursor-not-allowed"
            : "text-gray-400 bg-white hover:bg-gray-50"
            }`}
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button
          disabled={loading}
          type="submit"
          className="px-14 py-3 rounded-xl font-semibold text-white bg-[#2D2D2D] hover:bg-black transition-colors"
          onClick={() => submitCurrentForm()}
        >
          {loading ? "Creating..." : activeTab === "Media" ? "Create Athlete" : "Next"}
        </button>
      </div>
      {athleteCreated && (
        <SuccessModal
          onClick={() => {
            setAthleteCreated(false);
            queryClient.invalidateQueries({ queryKey: ["athelete"] });
            navigate('/app/athletes')
          }}
          message={`Athlete ${successType}`}
          title={`Athlete profile has been ${successType}.`}
        />
      )}
    </div>
  );
}
