import { IoCloseOutline, IoChevronBack } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

export default function AiLogoModal({ isOpen, onClose, onBack, onUseLogo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-[500px] h-[615px] p-6 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between ">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
            <IoChevronBack className="text-xl" />
          </button>
          <h2 className="text-xl font-bold text-[#2D3748]">Ai Generated Logo</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        {/* Prompt Input Area */}
        <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-100  mt-2">
          <div className="flex gap-3">
            <BsStars className="text-[#5D5FEF] text-2xl mt-1 shrink-0" />
            <textarea
              className="bg-transparent w-full outline-none text-sm text-gray-700 resize-none h-16"
              defaultValue="Logo for school team with yellow, red and blue stripes embedded inside a circle."
            />
          </div>
        </div>
        <div className="text-right text-xs text-gray-400 mb-6">0/1000</div>

        {/* Logo Preview Area */}
        <div className="bg-[#F0F5FF] h-[300px] w-[460px] rounded-2xl aspect-square flex items-center justify-center mb-8 border-2 border-dashed border-blue-100">
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
             {/* Replace with your actual generated image */}
             <div className="text-center font-bold text-xs">
                <div className="flex gap-1 justify-center mb-1">
                    <div className="w-2 h-8 bg-yellow-400"></div>
                    <div className="w-2 h-8 bg-red-500"></div>
                    <div className="w-2 h-8 bg-blue-600"></div>
                </div>
                Logoipsum
             </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onUseLogo}
          className="w-full py-4 bg-[#0085CA] text-white rounded-xl font-bold text-lg hover:bg-[#0074b3] transition-colors"
        >
          Use Logo
        </button>
      </div>
    </div>
  );
}