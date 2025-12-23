/* eslint-disable react/prop-types */

const MessageReplyModal = ({ onClick, onNext }) => {
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md px-4 py-8 w-[515px]">
        <div className="flex justify-between">
          <div>
            <p className="text-[#302C2C] text-[20px] font-bold">
              Reply to Query
            </p>
            <p className="text-[#302C2C] text-[15px] ">
              Send an email response to John Timber (Johntimber@gmail.com)
            </p>
          </div>
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
        <div className="flex flex-col justify-center items-center lg:h-auto md:h-screen border-[1px] border-[#E3E3E3] rounded-xl p-2 mt-2">
          <div className="border-[1px] border-[#E3E3E3] rounded-xl w-full mt-4 py-2 px-4">
            <p className="text-[16px] text-[#302C2C] font-semibold">
              Original Message
            </p>
            <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full">
              <p className="text-sm text-[#302C2C] font-light">
                I love the new update! However, I have a suggestion for
                improving the user interface.
              </p>
            </div>
          </div>
          <div className="w-full">
            {/* Notification Title */}
            <div className="mt-2 bg-[#FAF8F2] px-4 py-2 rounded-lg w-full">
              <p className="text-sm text-[#302C2C] font-light">Subject</p>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full mt-1 px-1 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent"
              />
            </div>

            {/* Description */}
            <div className="mt-2 bg-[#FAF8F2] p-4 rounded-lg w-full h-[120px]">
              <p className="text-sm text-[#302C2C] font-light">Message</p>
              <textarea
                placeholder=""
                className="w-full mt-2 px-3 py-2 text-sm text-[#302C2C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0085CA] bg-transparent h-[70px] resize-none"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-4 gap-2">
            <button
              onClick={onNext}
              className="w-full px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors"
            >
              Send Mail
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

export default MessageReplyModal;
