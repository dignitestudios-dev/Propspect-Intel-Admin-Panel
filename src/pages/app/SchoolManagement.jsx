import { FiPlus } from "react-icons/fi";
import { BiSolidNotification } from "react-icons/bi";
import { bin, pen } from "../../assets/export";
import { useState } from "react";
import CreateSchoolModal from "../../components/app/SchoolManagement/CreateSchoolModal";
import EditSchoolModal from "../../components/app/SchoolManagement/EditSchoolModal";

const schools = [
  {
    id: 1,
    title: "Washington Academy",
    description:
      "Adipiscing sem nunc a nunc mi. Nibh mattis quis massa aenean nisl potenti.",
    type: "All",
    status: "Send",
  },
  {
    id: 2,
    title: "California Institute",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem .",
    type: "All",
    status: "Send",
  },
  {
    id: 3,
    title: "Florida State University",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui tum.",
    type: "All",
    status: "Send",
  },
  {
    id: 4,
    title: "University of Illinois",
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.",
    type: "All",
    status: "Send",
  },
  {
    id: 5,
    title: "University of Michigan",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis  laboriosam.",
    type: "All",
    status: "Send",
  },
];

export default function SchoolManagement() {
  const [addSchoolModal, setAddSchoolModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  return (
    <div className="w-full min-h-screen  p-4 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BiSolidNotification className="text-2xl text-black" />
              <span className="text-xl font-semibold text-gray-900 mt-1">
                School Management
              </span>
            </div>

            {/* <h1 className="text-xl font-semibold text-gray-900 mt-1">
                     Athlete Management
                   </h1> */}

            <p className="text-sm px-9 text-gray-500">
              Manage your push notifications to users
            </p>
          </div>
        </div>
        <button
          onClick={() => setAddSchoolModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-[#0085CA] text-white rounded-lg font-semibold hover:bg-[#0087cad4] transition-colors shadow-sm"
        >
          <FiPlus strokeWidth={3} />
          <span>Add School</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className=" border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-white bg-opacity-30 border-b border-gray-200">
            <div className="font-semibold text-sm">School Name</div>
            <div className="font-semibold text-sm"></div>
            <div className="font-semibold text-sm">Logo</div>
            <div className="font-semibold text-sm ">Action</div>
          </div>

          <div className="space-y-4">
            {schools.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 gap-4 px-6 pt-2 hover:bg-blue-50/30 transition-colors border-t border-[#E3E3E3] group"
              >
                <div className="font-medium text-[#2D3748] text-sm py-2 mt-4">
                  {item.title}
                </div>
                <div className="font-medium text-[#2D3748] text-sm py-2 mt-4"></div>
                <div className="mt-4">
                  <div className="bg-gray-300 border border-gray-100  rounded-full text-sm text-[#2D3748] items-center gap-2 w-8 h-8"></div>
                </div>
                <div className="flex gap-4 text-gray-400 py-2 mt-4">
                  <div
                    className="cursor-pointer p-1 w-6 h-6 hover:bg-blue-100 rounded-full transition-colors"
                    onClick={() => setSelectedSchool(item)} // 👈 set clicked school
                  >
                    <img src={pen} alt="edit" />
                  </div>
                  <div className="cursor-pointer p-1 w-6 h-6 hover:bg-red-100 rounded-full transition-colors">
                    <img src={bin} alt="delete" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {addSchoolModal && (
        <CreateSchoolModal
          isOpen={addSchoolModal}
          onClick={() => {
            setAddSchoolModal(false);
          }}
          title="Email verified"
          description="Your email has been verified successfully."
        />
      )}
      {selectedSchool && (
        <EditSchoolModal
          isOpen={!!selectedSchool}
          onClick={() => setSelectedSchool(null)}
          school={selectedSchool}
        />
      )}
    </div>
  );
}
