/* eslint-disable react/prop-types */
import { FiEdit2, FiX } from "react-icons/fi";

const AddUserModal = ({
  setIsAddUserModalOpen,
  userStatus,
  setUserStatus,
  onNext,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md relative border border-gray-100 overflow-y-auto max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={() => setIsAddUserModalOpen(false)}
          className="absolute right-4 top-4 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors border"
        >
          <FiX size={18} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            Add User
          </h2>

          <div className="space-y-3">
            {/* Profile Image - Reduced Size */}
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#FDFBF7] flex items-center justify-center text-gray-400 text-xl font-medium border border-gray-100">
                  U
                </div>
                <button className="absolute bottom-0 right-0 p-1 bg-white border border-gray-200 rounded-full shadow-sm text-gray-600">
                  <FiEdit2 size={12} />
                </button>
              </div>
            </div>

            {/* Input Fields - Compact Padding */}
            {[
              { label: "Username", value: "David schumate" },
              { label: "Email", value: "Davidschumate@gmail.com" },
              { label: "Password", value: "154chwcwb#$656" },
              { label: "Subscription Date", value: "12/09/2025" },
            ].map((field, idx) => (
              <div
                key={idx}
                className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50"
              >
                <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                  {field.label}
                </label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
                />
              </div>
            ))}

            {/* Status Toggle - Compact */}
            <div className="pt-1">
              <p className="text-xs font-bold text-gray-800 mb-2">Set Status</p>
              <div className="flex bg-[#FDFBF7] p-1 rounded-xl border border-gray-50">
                <button
                  onClick={() => setUserStatus("Active")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    userStatus === "Active"
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setUserStatus("Inactive")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    userStatus === "Inactive"
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>

            {/* Action Buttons - Reduced Height */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onNext}
                className="flex-1 bg-[#0085CA] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
