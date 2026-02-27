/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { useFormik } from "formik";
import { addUserSchema } from "../../../schema/userSchema/userSchema";
import { addUserInitialValues } from "../../../init/addUserInitialValues";
import { axiosinstance } from "../../../axios";
import { SuccessToast, ErrorToast } from "../../global/Toaster";

const AddUserModal = ({ setIsAddUserModalOpen, userStatus, setUserStatus }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: addUserInitialValues,
    validationSchema: addUserSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // ✅ Dummy API call
        const response = await axiosinstance.post("/users", values);

        if (response.status === 200 || response.status === 201) {
          SuccessToast(response.data?.message || "User added successfully");
          setIsAddUserModalOpen(false);
        }
      } catch (error) {
        ErrorToast(
          error?.response?.data?.message || "Failed to add user. Try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = formik;

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

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Profile Image */}
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

            {/* Input Fields */}
            {[
              { name: "username", label: "Username" },
              { name: "email", label: "Email" },
              { name: "password", label: "Password" },
              { name: "subscriptionDate", label: "Subscription Date" },
            ].map((field, idx) => (
              <div key={idx} className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50">
                <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                  {field.label}
                </label>
                <input
                  type={field.name === "password" ? "password" : "text"}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
                />
                {errors[field.name] && touched[field.name] && (
                  <div className="text-red-500 text-[10px] mt-1">{errors[field.name]}</div>
                )}
              </div>
            ))}

            {/* Status Toggle */}
            <div className="pt-1">
              <p className="text-xs font-bold text-gray-800 mb-2">Set Status</p>
              <div className="flex bg-[#FDFBF7] p-1 rounded-xl border border-gray-50">
                {["Active", "Inactive"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setUserStatus(status);
                      setFieldValue("status", status);
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      values.status === status
                        ? "bg-white shadow-sm text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {errors.status && touched.status && (
                <div className="text-red-500 text-[10px] mt-1">{errors.status}</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#0085CA] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                {loading ? "Adding..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;