/* eslint-disable react/prop-types */
import { useState } from "react";
import { Upload } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import AiLogoModal from "./AiLogoModal";

const EditSchoolModal = ({ onClick, school }) => {

  const [logo, setLogo] = useState(
    school?.logo
      ? {
        id: 1,
        name: school.name,
        size: "auto",
        type: "image",
        thumbnail: school.logo,
      }
      : null
  );
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [schoolName, setSchoolName] = useState(school?.name || "");


  const removeLogo = () => setLogo(null);

  const handleUpdateSchool = () => {

    console.log("Updated school:", { name: schoolName, logo: logo?.thumbnail });
  };

  return (
    <div className="fixed -inset-6 bg-[#0A150F80] z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[515px]">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">Edit School</p>
          <button onClick={onClick} className="cursor-pointer rounded-sm p-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 font-light text-gray-400"
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

        <div className="flex flex-col justify-center items-center border-[1px] border-[#E3E3E3] rounded-xl p-4 w-full">

          <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">
            <p className="text-sm text-[#302C2C] font-light">School Name</p>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Enter name"
              className="w-full mt-2 px-1 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent"
            />
          </div>

          <div className="mt-4 w-full">
            {logo ? (
              <div
                className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-gray-50 shadow-sm cursor-pointer"
                onClick={() => setIsLogoModalOpen(true)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={logo.thumbnail}
                    alt="logo"
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-700">{logo.name}</p>
                    <p className="text-[11px] text-gray-400">{logo.size}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLogo();
                  }}
                  className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-gray-200 border-dashed rounded-2xl mt-4 bg-[#EAEEF8] p-6 flex flex-col items-center justify-center">
                <Upload size={48} className="text-[#0D0C0C99] mb-4" />
                <h4 className="font-bold text-[#302C2C] mb-1">Upload School Logo</h4>
                <p className="text-[14px] text-[#0D0C0C99] mb-2 text-center">
                  Or click to browse files · Max 50MB per file
                </p>
                <button
                  onClick={() => setIsLogoModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2 rounded-md bg-white shadow-sm text-[#0085CA] font-bold hover:bg-blue-50 transition-colors"
                >
                  <Upload />
                  Choose File
                </button>
              </div>
            )}
          </div>


          {isLogoModalOpen && (
            <AiLogoModal
              isOpen={isLogoModalOpen}
              onClose={() => setIsLogoModalOpen(false)}
              onUseLogo={(imgSrc) => {
                setLogo({ name: "Updated_Logo.png", size: "auto", thumbnail: imgSrc });
                setIsLogoModalOpen(false);
              }}
              aiPrompt={aiPrompt}
              setAiPrompt={setAiPrompt}
            />
          )}


          <div className="flex justify-between items-center w-full mt-6 gap-2">
            <button
              onClick={handleUpdateSchool}
              className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors"
            >
              Update
            </button>
            <button
              onClick={onClick}
              className="w-full px-5 py-2.5 rounded-md text-[#302C2C] font-semibold border-[1px] border-[#E3E3E3]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSchoolModal;