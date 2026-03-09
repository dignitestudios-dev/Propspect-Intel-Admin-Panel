import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axiosinstance from "../../axios";
import Cookies from 'js-cookie'

const changePasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ChangePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await axiosinstance.put("/user/change/password", {
            password: values.password,
          });
          if (response?.status === 200) {
            SuccessToast(response.data?.message || "Password changed successfully!");
            navigate("/auth/login");
            Cookies.remove('adminToken')
            localStorage.removeItem('email')

          }
        } catch (error) {
          ErrorToast(error?.response?.data?.message || "Password change failed. Try again.");
        } finally {
          setLoading(false);
        }
      },
    });

  return (

    <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black/70 backdrop-blur-md border border-white/20 p-8 md:p-10 lg:p-4">


      <div className="flex flex-col items-center text-center mb-6">
        <img src={Logo} alt="logo" className="w-28 h-28 md:w-32 md:h-32 object-contain mb-4" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
          Change Password
        </h1>
        <p className="mt-2 text-white/80 text-sm md:text-base">
          Enter your new password and confirm it
        </p>
      </div>

      <form className="w-full space-y-6" onSubmit={handleSubmit}>


        <div className="relative">
          <label className="text-white text-sm md:text-base font-light mb-1">Password</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter new password"
            className={`w-full px-3 py-3 md:py-4 rounded-md text-white placeholder-white/60 bg-white/10 border ${errors.password && touched.password ? "border-red-500" : "border-white/20"
              } focus:outline-none focus:ring-2 focus:ring-[#0b89c6] text-sm md:text-base`}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          >
            {isPasswordVisible ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password}</p>
          )}
        </div>


        <div className="relative">
          <label className="text-white text-sm md:text-base font-light mb-1">Confirm Password</label>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm new password"
            className={`w-full px-3 py-3 md:py-4 rounded-md text-white placeholder-white/60 bg-white/10 border ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-white/20"
              } focus:outline-none focus:ring-2 focus:ring-[#0b89c6] text-sm md:text-base`}
          />
          <button
            type="button"
            onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          >
            {isConfirmPasswordVisible ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 md:py-4 bg-[#0b89c6] rounded-md text-white font-semibold shadow-inner hover:bg-[#0972a0] transition-colors duration-200 disabled:opacity-70 text-sm md:text-base"
        >
          {loading && <FiLoader className="animate-spin mr-2" size={20} />}
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>

  );
};

export default ChangePassword;