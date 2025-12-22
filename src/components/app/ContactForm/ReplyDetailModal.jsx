/* eslint-disable react/prop-types */

const ReplyDetailModal = ({ onClick }) => {
  return (
    <div className="fixed -inset-6 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-md px-4 py-8 w-[515px]">
        <div className="flex justify-between">
          <div></div>
          <p className="text-[#302C2C] text-[20px] font-bold">
            Message Details
          </p>
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
        <div className="flex flex-col justify-center items-center lg:h-auto md:h-screen border-[1px] border-[#E3E3E3] rounded-xl p-2 ">
          <div className="border-[1px] border-[#E3E3E3] rounded-xl w-full grid grid-cols-2 py-2">
            <div>
              <p className="text-[14px] text-[#0D0C0C99] py-2 px-4">Name</p>
              <p className="text-[16px] text-[#302C2C] font-semibold py-2 px-4">
                John Doe
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#0D0C0C99] py-2 px-4">Email</p>
              <p className="text-[16px] text-[#302C2C] font-semibold py-2 px-4">
                john@example.com
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#0D0C0C99] py-2 px-4">Status</p>
              <button className="bg-[#f5e7db] border border-gray-100 px-6 py-2 ml-2 rounded-xl text-sm text-[#2D3748]  hover:shadow-md transition-shadow inline-flex items-center gap-2">
                <p className={`${"text-[#E57E25]"} text-[14px]`}>Pending</p>
              </button>
            </div>
            <div>
              <p className="text-[14px] text-[#0D0C0C99] py-2 px-4">Date</p>
              <p className="text-[16px] text-[#302C2C] font-semibold py-2 px-4">
                20/12/2023
              </p>
            </div>
          </div>
          <div className="border-[1px] border-[#E3E3E3] rounded-xl w-full mt-4 py-2 px-4">
            <p className="text-[16px] text-[#302C2C] font-semibold">
              Original Message
            </p>
            <div className="mt-2 bg-[#EAEEF8] p-4 rounded-lg w-full">
              <p className="text-sm text-[#302C2C] font-light">
                I love the new update! However, I have a suggestion for
                improving the user interface.
              </p>
            </div>
          </div>
          <div className="border-[1px] border-[#E3E3E3] rounded-xl w-full mt-4 py-2 px-4">
            <p className="text-[16px] text-[#302C2C] font-semibold">Reply</p>
            <div className="mt-2 bg-[#EAEEF8] p-4 rounded-lg w-full">
              <p className="text-[14px] font-bold text-[#302C2C] ">Subject</p>
              <p className="text-sm text-[#302C2C] font-light">
                Re: Feature Request - Sarah Johnson
              </p>
            </div>

            <div className="mt-2 bg-[#EAEEF8] p-4 rounded-lg w-full">
              <p className="text-[14px] font-bold text-[#302C2C]">
                Re: Feature Request - Sarah Johnson
              </p>
              <p className="text-sm text-[#302C2C] font-light">
                Thank you for contacting us. We are glad to have your message.
              </p>
            </div>
          </div>
          <div className="flex justify-Center items-center w-full mt-4 gap-2">
            <button
              onClick={onClick}
              className="w-full px-5 py-2.5 rounded-md text-[#302C2C] font-semibold border-[1px] border-[#E3E3E3]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyDetailModal;
