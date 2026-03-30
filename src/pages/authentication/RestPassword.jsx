import React, { useState } from "react";
import { useFormik } from "formik";
import { signInSchema } from "../../schema/authentication/dummyLoginSchema";
import { useNavigate } from "react-router";
import { FiLoader } from "react-icons/fi";
import { Logo } from "../../assets/export";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axiosinstance from "../../axios";

const RestPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: signInSchema.pick(["email"]),
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await axiosinstance.post("/user/otp/request", {
            email: values.email,
          });

          if (response.status === 200) {
            SuccessToast(response.data?.message || "Recovery link sent!");
            navigate("/auth/otp-verification");
            localStorage.setItem('email', values.email)
          }
        } catch (error) {
          ErrorToast(error?.response?.data?.message || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black/30 backdrop-blur-md border border-white/20 p-8 md:p-10 lg:p-4">

      {/* Logo & Heading */}
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={Logo}
          alt="logo"
          className="w-28 h-28 md:w-32 md:h-32 object-contain mb-4"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
          Reset Password
        </h1>
        <p className="mt-2 text-white/80 text-sm md:text-base">
          Enter email to get password recovery link with 6 digit code
        </p>
      </div>

      {/* Form */}
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-white text-sm md:text-base font-light mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className={`w-full px-3 py-3 md:py-4 rounded-md text-white placeholder-white/60 bg-white/10 border 
                          ${errors.email && touched.email ? "border-red-500" : "border-white/20"} 
                          focus:outline-none focus:ring-2 focus:ring-[#0b89c6] text-sm md:text-base`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 md:py-4 bg-[#0b89c6] rounded-md text-white font-semibold shadow-inner hover:bg-[#0972a0] transition-colors duration-200 disabled:opacity-70 text-sm md:text-base"
        >
          {loading ? <FiLoader className="animate-spin mr-2" size={20} /> : "Confirm"}
          {loading && " Loading..."}
        </button>
      </form>
    </div>
  );
};

export default RestPassword;