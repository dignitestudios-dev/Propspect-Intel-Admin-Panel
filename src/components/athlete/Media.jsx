
import { Upload } from "lucide-react";
import React, { useState } from "react";
import { FiArrowLeft, FiChevronRight, FiUploadCloud, FiTrash2, FiFile } from "react-icons/fi";

export default function Media() {
  const [activeTab, setActiveTab] = useState("Media");
  
  // State for uploaded files
  const [files, setFiles] = useState([
    { id: 1, name: "Image.jpg", size: "2.4 mb", type: "image", thumbnail: "https://via.placeholder.com/40" },
    { id: 2, name: "Video.mp4", size: "10.1 mb", type: "video", thumbnail: "https://via.placeholder.com/40" }
  ]);

  const tabs = [
    "Basic Info", "Family", "Athlete", "Overview", 
    "Stats", "Education", "Achievements", "Media"
  ];

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      
      {/* Main Form Content */}
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        
        {activeTab === "Media" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div className=" border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="font-bold text-gray-800 text-lg mb-1">Images & Videos</h3>
              <p className="text-xs text-gray-400 mb-6">Upload photos and videos of the athlete. Drag and drop files or click to browse.</p>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-white rounded-2xl p-12 flex flex-col items-center justify-center bg-white/30 mb-8">
                <Upload size={48} className="text-gray-400 mb-4" />
                <h4 className="font-bold text-gray-700 mb-1">Drop images and videos here</h4>
                <p className="text-[11px] text-gray-400 mb-6">Or click to browse files · Max 50MB per file</p>
                <p className="text-[10px] text-gray-300 mb-6">Supported formats: JPG, PNG, GIF, MP4, MOV, AVI, WebM</p>
                <button className="flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-xs hover:bg-blue-50 transition-colors">
                  <Upload />
                  Choose Files
                </button>
              </div>

              {/* File List */}
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-gray-50 shadow-sm">
                    <div className="flex items-center gap-4">
                      <img 
                        src={file.thumbnail} 
                        alt="thumbnail" 
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100" 
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-700">{file.name}</p>
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
            </div>
          </div>
        )}

        {/* Footer Actions */}
        
      </div>
    </div>
  );
}