/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";
import { useAppDispatch } from "../../lib/store/hook";
import { setFormData, setMode } from "../../lib/store/feature/athleteFormSlice";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import axiosinstance from "../../axios";

const AthleteAiModal = ({ onClick }) => {
  const [aiPrompt, setAiPrompt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ Close handler (clean)
  const handleClose = () => {
    onClick();
  };

  const handleAiAtheleteCreate = async () => {
    if (!aiPrompt) {
      setError("Please Enter Prompt");
      return;
    }

    const payload = { prompt: aiPrompt };

    setLoading(true);
    try {
      const response = await axiosinstance.post(
        "/athlete/ai/generate/json",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        SuccessToast(response?.data?.message);
        dispatch(setFormData(response?.data?.data));
        dispatch(setMode("ai"));
        navigate("/app/athleteform");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Background click close
    <div
      className="fixed inset-0 bg-[#0A150F80] z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* ❗ stop propagation so inner click doesn't close */}
      <div
        className="bg-white rounded-[12px] shadow-md p-8 w-[715px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">
            Add Prompt
          </p>

          {/* ❌ Cross Button */}
          <div onClick={handleClose} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Textarea */}
        <div className="flex flex-col justify-center items-center border border-[#E3E3E3] rounded-xl p-2 mt-4">
          <div className="rounded-lg w-full h-[120px]">
            <textarea
              placeholder="Type Prompt here"
              value={aiPrompt}
              onChange={(e) => {
                setAiPrompt(e.target.value);
                setError("");
              }}
              className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent h-[70px] resize-none"
            />
          </div>
        </div>

        {error && (
          <span className="text-red-500 text-xs">{error}</span>
        )}

        {/* Buttons */}
        <div className="flex justify-end items-center w-full mt-4 gap-2">
          <div className="w-full"></div>

          {/* ❌ Cancel Button */}
          <button
            onClick={handleClose}
            className="w-full px-5 py-2.5 rounded-md text-[#302C2C] border border-[#E3E3E3] hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* ✅ Submit */}
          <button
            onClick={handleAiAtheleteCreate}
            className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors"
          >
            {loading ? "Filling Form..." : "Fill Form"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteAiModal;