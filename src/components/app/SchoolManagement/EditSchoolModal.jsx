/* eslint-disable react/prop-types */
import { useState } from "react";
import { Upload } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";

const EditSchoolModal = ({ onClick }) => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Image.jpg",
      size: "2.4 mb",
      type: "image",
      thumbnail: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Video.mp4",
      size: "10.1 mb",
      type: "video",
      thumbnail: "https://via.placeholder.com/40",
    },
  ]);

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md p-8 w-[515px]">
        {/* Header */}
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">Edit School</p>
          <div
            className="flex justify-between items-center pb-2"
            onClick={onClick}
          >
            <span className="cursor-pointer rounded-sm p-[2px]">
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
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col justify-center items-center border-[1px] border-[#E3E3E3] rounded-xl p-2">
          {/* School Name */}
          <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">
            <p className="text-sm text-[#302C2C] font-light">School Name</p>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full mt-2 px-1 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent"
            />
          </div>

          {/* Files Section */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 w-full">
            {files.length > 0 ? (
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-gray-50 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={file.thumbnail}
                        alt="thumbnail"
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-700">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-gray-400">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-gray-200 border-dashed rounded-2xl mt-4 bg-[#EAEEF8]">
                {/* Upload Dropzone */}
                <div className="p-12 flex flex-col items-center justify-center bg-white/30">
                  <Upload size={48} className="text-[#0D0C0C99] mb-4" />
                  <h4 className="font-bold text-[#302C2C] mb-1">
                    Upload School Logo
                  </h4>
                  <p className="text-[14px] text-[#0D0C0C99] font-[400] mb-6">
                    Or click to browse files · Max 50MB per file
                  </p>
                  <p className="text-[12px] font-extralight text-[#0D0C0C99] mb-6">
                    Supported formats: JPG, PNG, GIF, MP4, MOV, AVI, WebM
                  </p>
                  <button className="flex items-center gap-2 px-6 py-2 rounded-md bg-white shadow-sm text-[#0085CA] font-bold hover:bg-blue-50 transition-colors">
                    <Upload />
                    Choose Files
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center w-full mt-4 gap-2">
            <button className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors">
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
