/* eslint-disable react/prop-types */
import { Upload, Trash2 } from "lucide-react"; // Added Trash2
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import AiLogoModal from "./AiLogoModal";

const CreateSchoolModal = ({ onClick, onNext }) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  // State to hold the uploaded/generated logo
  const [logo, setLogo] = useState(null); 

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  return (
    <>
      <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-[32px] shadow-md p-8 w-[515px]">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10"></div> {/* Spacer */}
            <p className="text-[#302C2C] text-[20px] font-bold">Add School</p>
            <button
              className="p-2 hover:bg-gray-100 rounded-full border border-gray-200"
              onClick={onClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col border-[1px] border-[#E3E3E3] rounded-3xl p-4">
            {/* School Name Input */}
            <div className="bg-[#FAF8F2] p-4 rounded-2xl w-full">
              <p className="text-xs text-gray-400 font-light">School Name</p>
              <input
                type="text"
                defaultValue="Washington Academy"
                placeholder="Enter name"
                className="w-full mt-1 text-sm text-[#302C2C] font-medium focus:outline-none bg-transparent"
              />
            </div>

            {/* Conditionally Render AI Button and Upload/Preview Area */}
            {!logo ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="w-full py-3 border mt-4 border-gray-200 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition-all text-[#302C2C]"
                >
                  <BsStars className="text-[#5D5FEF] text-2xl" />
                  Generate logo with AI
                </button>

                <div className="border-2 border-gray-200 border-dashed rounded-2xl mt-4 bg-[#EAEEF8] overflow-hidden">
                  <div className="p-12 flex flex-col items-center justify-center bg-white/30">
                    <Upload size={48} className="text-[#0D0C0C99] mb-4" />
                    <h4 className="font-bold text-[#302C2C] mb-1">Upload School Logo</h4>
                    <p className="text-[14px] text-[#0D0C0C99] mb-6 text-center">
                      Or click to browse files · Max 50MB per file
                    </p>
                    <button 
                      onClick={() => setLogo({ name: "Logo.jpg", size: "2.4 mb" })}
                      className="flex items-center gap-2 px-6 py-2 rounded-md bg-white shadow-sm text-[#0085CA] font-bold hover:bg-blue-50 transition-colors"
                    >
                      <Upload size={18} />
                      Choose Files
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* ✅ File Preview State (Matches your second image) */
              <div className="mt-4 bg-[#FAF8F2] p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                    {/* Placeholder for actual image thumbnail */}
                    <div className="w-6 h-6 bg-gray-100 rounded" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#302C2C]">{logo.name}</p>
                    <p className="text-xs text-gray-400">{logo.size}</p>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveLogo}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}

            <div className="flex justify-between items-center w-full mt-6 gap-3">
              <button
                onClick={() => onNext()}
                className="w-full py-3 bg-[#0085CA] text-white rounded-xl font-bold hover:bg-[#0074b3] transition-colors"
              >
                Add School
              </button>
              <button
                onClick={onClick}
                className="w-full py-3 rounded-xl text-[#302C2C] font-bold border border-[#E3E3E3] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <AiLogoModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onBack={() => setIsAiModalOpen(false)}
        onUseLogo={() => {
          // Set manual state to simulate the logo being "added"
          setLogo({ name: "AI_Generated_Logo.png", size: "1.2 mb" });
          setIsAiModalOpen(false);
        }}
      />
    </>
  );
};

export default CreateSchoolModal;