/* eslint-disable react/prop-types */

const DeleteModal = ({ onClick, title, message }) => {
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md px-4 py-4 w-[515px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[16px] text-[#302C2C] font-semibold">{title}</p>

            <p className="text-sm text-[#302C2C] font-light">{message}</p>
          </div>
          <div
            className="flex justify-between items-center  "
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
        <div className="flex flex-col lg:h-auto md:h-screen rounded-xl p-2 "></div>
      </div>
    </div>
  );
};

export default DeleteModal;
