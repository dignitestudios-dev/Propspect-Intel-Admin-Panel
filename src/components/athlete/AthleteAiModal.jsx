/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";
import { useAppDispatch } from "../../lib/store/hook";
import { setFormData, setMode } from "../../lib/store/feature/athleteFormSlice";
import { athleteData } from "../../static/mockData";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import axiosinstance from "../../axios";


const AthleteAiModal = ({ onClick }) => {
  const [aiPrompt, setAiPrompt] = useState('')
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const navigate = useNavigate(false);
  const [loading, setLoading] = useState(false)
  const handleAiAtheleteCreate = async () => {
    if (!aiPrompt) {
      setError("Please Enter Prompt")
      return
    }
    const paylaod = {
      prompt: aiPrompt
    }
    setLoading(true)
    try {
      const response = await axiosinstance.post('/athlete/ai/generate/json', paylaod)
      if (response.status === 200 || response?.status === 201) {
        SuccessToast(response?.data?.message)
        dispatch(setFormData(response?.data?.data));
        dispatch(setMode("ai"));
        navigate("/app/add-athlete")

      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }






  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[715px]  ">
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">Add Prompt</p>
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
          <div className=" rounded-lg w-full h-[120px]">
            <textarea
              placeholder="Type Prompt here"
              value={aiPrompt}
              onChange={(e) => {

                setAiPrompt(e.target.value)
                setError('')
              }}
              className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent h-[70px] resize-none"
            ></textarea>
          </div>
        </div>
        {error && <span className="text-red-500 text-xs">{error}</span>}
        {/* Action Buttons */}
        <div className="flex justify-end items-center w-full mt-4 gap-2">
          <div className="w-full"></div>
          <button className="w-full px-5 py-2.5 rounded-md text-[#302C2C] border-[1px] border-[#E3E3E3]">
            Cancel
          </button>

          <button
            onClick={handleAiAtheleteCreate}
            className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors"
          >
            {loading ? "Fill Form...." : "Fill Form"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteAiModal;
