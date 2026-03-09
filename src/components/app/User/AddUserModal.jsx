import { useEffect, useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { useFormik } from "formik";
import { addUserSchema } from "../../../schema/userSchema/userSchema";
import { addUserInitialValues } from "../../../init/addUserInitialValues";
import axiosinstance from "../../../axios";
import { SuccessToast, ErrorToast } from "../../../components/global/Toaster";

const AddUserModal = ({ setIsAddUserModalOpen, userStatus, setUserStatus, onNext, editUser,
  setEditUser, refetch, setIsSuccess, setSuccessType }) => {
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);

  const formik = useFormik({
    initialValues: editUser
      ? {
        username: editUser.name || "",
        email: editUser.email || "",
        password: "",
        subscriptionDate: editUser.subscriptionEndDate?.slice(0, 10) || "",
        status: editUser.isActive ? "Active" : "Inactive",
        subscription: editUser.subscriptionPlan || "",
        profileImage: null
      }
      : addUserInitialValues,
    validationSchema: addUserSchema(!!editUser),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();

        formData.append("name", values.username);
        formData.append("email", values.email);

        if (values.password) {
          formData.append("password", values.password);
        }

        formData.append("subscriptionEndDate", values.subscriptionDate);
        formData.append("subscriptionPlan", values.subscription);
        formData.append("isActive", values.status === "Active");

        if (values.profileImage) {
          formData.append("profilePicture", values.profileImage);
        }

        let response;

        if (editUser) {
          response = await axiosinstance.put(`/user/${editUser._id}`, formData);
        } else {
          response = await axiosinstance.post("/user", formData);
        }

        if (response?.status === 201 || response?.status === 200) {

          SuccessToast(
            response.data?.message ||
            (editUser ? "User updated successfully" : "User added successfully")
          );
          setSuccessType(editUser ? "updated" : "added")

          setIsAddUserModalOpen(false);
          setEditUser(null);
          refetch();
          setIsSuccess(true)
        }

      } catch (error) {
        ErrorToast(
          error?.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }
  });


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      formik.setFieldValue("profileImage", file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
    }
  };

  useEffect(() => {
    if (editUser?.profilePicture) {
      setProfilePreview(editUser.profilePicture);
    }
  }, [editUser]);
  return (
    <div className="fixed -inset-4 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md relative border border-gray-100 overflow-y-auto max-h-[95vh]">


        <button
          onClick={() => setIsAddUserModalOpen(false)}
          className="absolute right-4 top-4 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors border"
        >
          <FiX size={18} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            {editUser ? "Edit User" : "Add User"}
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-3">



            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#FDFBF7] flex items-center justify-center text-gray-400 text-xl font-medium border border-gray-100 overflow-hidden">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    "U"
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1 bg-white border border-gray-200 rounded-full shadow-sm text-gray-600 cursor-pointer">
                  <FiEdit2 size={12} />
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

            </div>
            {formik.errors.profileImage && (
              <div className="text-red-500 text-[10px] mt-1 text-center">{formik.errors.profileImage}</div>
            )}


            <div className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50">
              <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-[10px] mt-1">{formik.errors.username}</div>
              )}
            </div>


            <div className={` ${!!editUser ? 'cursor-not-allowed bg-gray-200' : 'bg-[#FDFBF7] '} px-4 py-2 rounded-xl border border-gray-50`}>
              <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled={!!editUser}
                className={`w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm `}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[10px] mt-1">{formik.errors.email}</div>
              )}
            </div>


            <div className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50">
              <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-[10px] mt-1">{formik.errors.password}</div>
              )}
            </div>
            <div className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50">
              <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                Subscription Plan
              </label>

              <select
                name="subscription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subscription}
                className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
              >
                <option value="">Select Plan</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
              </select>

              {formik.touched.subscription && formik.errors.subscription && (
                <div className="text-red-500 text-[10px] mt-1">
                  {formik.errors.subscription}
                </div>
              )}
            </div>


            <div className="bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-50">
              <label className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                Subscription Date
              </label>
              <input
                type="date"
                name="subscriptionDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subscriptionDate}
                className="w-full bg-transparent text-gray-800 font-semibold focus:outline-none text-sm"
              />
              {formik.touched.subscriptionDate && formik.errors.subscriptionDate && (
                <div className="text-red-500 text-[10px] mt-1">{formik.errors.subscriptionDate}</div>
              )}
            </div>


            <div className="pt-1">
              <p className="text-xs font-bold text-gray-800 mb-2">Set Status</p>
              <div className="flex bg-[#FDFBF7] p-1 rounded-xl border border-gray-50">
                {["Active", "Inactive"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setUserStatus(status);
                      formik.setFieldValue("status", status);
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${formik.values.status === status
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-400"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {formik.touched.status && formik.errors.status && (
                <div className="text-red-500 text-[10px] mt-1">{formik.errors.status}</div>
              )}
            </div>


            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#0085CA] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                {loading
                  ? "Saving..."
                  : editUser
                    ? "Update User"
                    : "Add User"}
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