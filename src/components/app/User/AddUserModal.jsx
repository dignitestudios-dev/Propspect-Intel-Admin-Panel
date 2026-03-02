import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addUserSchema } from "../../../schema/userSchema/userSchema";
import axios from "../../../axios";
import { SuccessToast, ErrorToast } from "../../../components/global/Toaster";

const AddUserModal = ({
  setIsAddUserModalOpen,
  userStatus,
  setUserStatus,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    subscriptionDate: "",
    status: "",
    profileImage: null,
  };

  return (
    <div className="fixed -inset-4 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
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

          <Formik
            initialValues={initialValues}
            validationSchema={addUserSchema}
            onSubmit={async (values) => {
              setLoading(true);

              try {
                const formData = new FormData();

                formData.append("username", values.username);
                formData.append("email", values.email);
                formData.append("password", values.password);
                formData.append("subscriptionDate", values.subscriptionDate);
                formData.append("status", values.status);

                if (values.profileImage) {
                  formData.append("profileImage", values.profileImage);
                }

                const response = await axios.post("/users", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });

                if (response.status === 200 || response.status === 201) {
                  SuccessToast(
                    response.data?.message || "User added successfully"
                  );
                  setIsAddUserModalOpen(false);
                  if (onNext) onNext();
                }
              } catch (error) {
                ErrorToast(
                  error?.response?.data?.message ||
                    "Failed to add user. Try again."
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-3">
                
                {/* Profile Image Upload */}
                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[#FDFBF7] flex items-center justify-center border border-gray-100">
                      {values.profileImage ? (
                        <img
                          src={URL.createObjectURL(values.profileImage)}
                          alt="profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xl font-medium">
                          U
                        </span>
                      )}
                    </div>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      id="profileUpload"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          setFieldValue("profileImage", file);
                        }
                      }}
                    />

                    {/* Edit Icon */}
                    <label
                      htmlFor="profileUpload"
                      className="absolute bottom-0 right-0 p-1 bg-white border border-gray-200 rounded-full shadow-sm text-gray-600 cursor-pointer"
                    >
                      <FiEdit2 size={12} />
                    </label>
                  </div>
                </div>

                {/* Input Fields */}
                {[
                  { name: "username", label: "Username", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "password", label: "Password", type: "password" },
                  { name: "subscriptionDate", label: "Subscription Date", type: "date" },
                ].map((field, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50"
                  >
                    <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <Field
                      type={field.type}
                      name={field.name}
                      className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-[10px] mt-1"
                    />
                  </div>
                ))}

                {/* Status Toggle */}
                <div className="pt-1">
                  <p className="text-xs font-bold text-gray-800 mb-2">
                    Set Status
                  </p>
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
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-[10px] mt-1"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#0085CA] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors disabled:opacity-60"
                  >
                    {loading ? "Adding..." : "Add User"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;