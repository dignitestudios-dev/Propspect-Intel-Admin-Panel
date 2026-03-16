import { IoCloseOutline, IoChevronBack } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import { ErrorToast } from "../../global/Toaster";

export default function AiLogoModal({ isOpen, onClose, onBack, onUseLogo, setAiPrompt, aiPrompt, generateImage }) {
  const [loading, setLoading] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!aiPrompt) {
      ErrorToast("Please Enter Prompt");
      return;
    }
    try {
      setLoading(true);
      const img = await generateImage(aiPrompt);
      
      setGeneratedLogo(img);
    } catch (err) {
      console.error(err);
      ErrorToast("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };
  const handleUseLogo = () => {
    if (generatedLogo) {
      onUseLogo(generatedLogo);
      onClose();
    }
  };
  console.log(generatedLogo,"generatedLogo")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-[520px] max-w-[90vw] max-h-[90vh] overflow-y-auto p-6 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
            <IoChevronBack className="text-xl" />
          </button>
          <h2 className="text-xl font-bold text-[#2D3748] text-center flex-1">AI Generated Logo</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        {/* Prompt Input */}
        <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-100 mb-4">
          <div className="flex gap-3">
            <BsStars className="text-[#5D5FEF] text-2xl mt-1 shrink-0" />
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-gray-700 resize-none h-16"
              placeholder="Enter your prompt here..."
            />
          </div>
          <button
            onClick={handleGenerate}
            className="w-full py-3 mt-3 bg-[#5D5FEF] text-white rounded-xl font-bold hover:bg-[#4b4fd2] transition-colors"
          >
            {loading ? "Generating..." : "Generate Logo"}
          </button>
        </div>

        <div className="text-right text-xs text-gray-400 mb-2">0/1000</div>

        {/* Generated Logo Display */}
        <div className="bg-[#F0F5FF] w-full flex items-center justify-center h-[300px] rounded-2xl border-2 border-dashed border-blue-100 mb-6">
          {generatedLogo ? (
            <img src={generatedLogo} alt="Generated Logo" className="w-40 h-40 object-contain" />
          ) : (
            <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden text-center font-bold text-xs">
              <div className="flex gap-1 justify-center mb-1">
                <div className="w-2 h-8 bg-yellow-400"></div>
                <div className="w-2 h-8 bg-red-500"></div>
                <div className="w-2 h-8 bg-blue-600"></div>
              </div>
              Logoipsum
            </div>
          )}
        </div>


        <button
          onClick={handleUseLogo}
          disabled={!generatedLogo}
          className={`w-full py-3 bg-[#0085CA] text-white rounded-xl font-bold text-lg hover:bg-[#0074b3] transition-colors ${!generatedLogo ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Use Logo
        </button>
      </div>
    </div>
  );
}