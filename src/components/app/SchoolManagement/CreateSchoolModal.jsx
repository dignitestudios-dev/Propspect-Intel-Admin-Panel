/* eslint-disable react/prop-types */
import { Upload, Trash2 } from "lucide-react"; // Added Trash2
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import AiLogoModal from "./AiLogoModal";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import axiosinstance from "../../../axios";
import { base64ToBinaryFile } from "../../../lib/helpers";
import { useQueryClient } from "@tanstack/react-query";

const CreateSchoolModal = ({
  onClick,
  onNext,
  editMode,
  subject,
  setSubject,
  logo,
  setLogo,
  setPage
}) => {
  const query = useQueryClient();
  const [error, setError] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerate = () => {
    if (subject.length === 0) {
      ErrorToast("Please enter Subject");
    } else {
      setIsAiModalOpen(true);
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      ErrorToast("File is too large! Max 50MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogo({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        src: reader.result, // base64
        file: file, // actual file
      });
    };
    reader.readAsDataURL(file);
  };
  const generateImage = async () => {
    const payload = {
      schoolName: subject,
      prompt: aiPrompt,
    };
    try {
      const response = await axiosinstance.post("/school/ai/logo", payload);
      if (response?.status === 200 || response?.status === 201) {
        const data = response.data.data;

        if (data) return `data:image/png;base64,${data}`;
      }
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };
  async function resizeBase64Image(base64Str, maxWidth = 512, maxHeight = 512) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/png"));
      };
    });
  }

  const handleAddOrEditSchool = async () => {
    if (!subject) return setError("Please enter School Name");

    // const validNameRegex = /^[A-Za-z0-9-& ]+$/;
    // if (!validNameRegex.test(subject.trim())) {
    //   return setError(
    //     "School Name can only contain letters, numbers, and spaces",
    //   );
    // }

    setLoading(true);
    try {
      const fd = new FormData();
      if (editMode?._id) {
        if (subject.trim() !== editMode.name) {
          fd.append("name", subject.trim());
        }
      } else {
        fd.append("name", subject.trim());
      }

      if (logo?.src?.startsWith("data:image")) {
        let smallBase64 = await resizeBase64Image(logo.src);
        const file = logo.file || base64ToBinaryFile(smallBase64, "logo.png");
        fd.append("logo", file);
      }

      let response;
      if (editMode?._id) {
        response = await axiosinstance.patch(`/school/${editMode._id}`, fd);
      } else {
        response = await axiosinstance.post("/school", fd);
      }

      if (response?.status === 200 || response?.status === 201) {
        const message =
          response?.data?.message ||
          (editMode?._id
            ? "School updated successfully"
            : "School added successfully");
        SuccessToast(message);
        query.invalidateQueries({ queryKey: ["school"] });
        setPage(1); 
        onNext();
      }
    } catch (err) {
      ErrorToast(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
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
            <div className="bg-[#FAF8F2] p-4 rounded-2xl w-full">
              <p className="text-xs text-gray-400 font-light">School Name</p>
              <input
                type="text"
                value={subject}
                maxLength={40}
                placeholder="Enter name"
                onChange={(e) => {
                  const value = e.target.value;
                  // const filtered = value.replace(/[^A-Za-z0-9 ]/g, "");
                  setSubject(value);
                  setError("");
                }}
                className="w-full mt-1 text-sm text-[#302C2C] font-medium focus:outline-none bg-transparent"
              />
            </div>
            {error && (
              <span className="text-red-500 text-xs mt-2">{error}</span>
            )}

            {!logo ? (
              <>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="w-full py-3 border mt-4 border-gray-200 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition-all text-[#302C2C]"
                >
                  <BsStars className="text-[#5D5FEF] text-2xl" />
                  Generate logo with AI
                </button>

                <div className="border-2 border-gray-200 border-dashed rounded-2xl mt-4 bg-[#EAEEF8] overflow-hidden">
                  <div className="p-12 flex flex-col items-center justify-center bg-white/30">
                    <Upload size={48} className="text-[#0D0C0C99] mb-4" />
                    <h4 className="font-bold text-[#302C2C] mb-1">
                      Upload School Logo
                    </h4>
                    <p className="text-[14px] text-[#0D0C0C99] mb-6 text-center">
                      Or click to browse files · Max 50MB per file
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      id="manualLogoUpload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button
                      onClick={() =>
                        document.getElementById("manualLogoUpload").click()
                      }
                      className="flex items-center gap-2 px-6 py-2 rounded-md bg-white shadow-sm text-[#0085CA] font-bold hover:bg-blue-50 transition-colors"
                    >
                      <Upload size={18} />
                      Choose Files
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4 bg-[#FAF8F2] p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                    <img src={logo?.src} alt="" className="px-0.5 rounded " />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#302C2C]">
                      this is {logo.name}
                    </p>
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
                onClick={handleAddOrEditSchool}
                className="w-full py-3 bg-[#0085CA] text-white rounded-xl font-bold hover:bg-[#0074b3] transition-colors"
              >
                {loading
                  ? editMode?._id
                    ? "Updating..."
                    : "Adding..."
                  : editMode?._id
                    ? "Update School"
                    : "Add School"}
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
        aiPrompt={aiPrompt}
        setAiPrompt={setAiPrompt}
        generateImage={generateImage}
        onUseLogo={(imgSrc) => {
          // imgSrc = Base64 or URL from modal
          setLogo({
            name: "AI_Generated_Logo.png",
            size: "1.2 mb",
            src: imgSrc,
          });
          setIsAiModalOpen(false);
        }}
      />
    </>
  );
};

export default CreateSchoolModal;
