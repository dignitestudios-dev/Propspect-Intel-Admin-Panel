/* eslint-disable react/prop-types */

const DeleteModal = ({ onClick, onNext }) => {
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md px-4 py-4 w-[515px]">
        <div className="flex flex-col lg:h-auto md:h-screen rounded-xl p-2 ">
          <p className="text-[16px] text-[#302C2C] font-semibold">
            Delete Message
          </p>

          <p className="text-sm text-[#302C2C] font-light">
            Message will be deleted
          </p>
        </div>
        <div className="flex justify-end items-center w-full mt-4 gap-2">
          <div className="w-full"></div>
          <button
            onClick={onClick}
            className="w-full px-5 py-2.5 rounded-md text-[#302C2C] font-semibold border-[1px] border-[#E3E3E3]"
          >
            Cancel
          </button>
          <button
            onClick={onNext}
            className="w-full px-5 py-2.5 bg-red-600 text-white rounded-lg  hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
