import React, { useState } from "react";
// import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/dummyLoginValues";
import { signInSchema } from "../../schema/authentication/dummyLoginSchema";
import { NavLink, useNavigate } from "react-router";
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";

const RestPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const { loading, postData } = useLogin();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          password: values?.password,
        };
        postData("/admin/login", false, null, data, processLogin);

        // Use the loading state to show loading spinner
        // Use the response if you want to perform any specific functionality
        // Otherwise you can just pass a callback that will process everything
      },
    });

  return (
    <div className="relative z-10 w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl">
      {/* frosted glass panel */}
      <div className="bg-gradient-to-b from-black/50 to-black/30 border border-white/10 p-10 rounded-2xl backdrop-blur-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex items-center justify-center">
            {/* logo placeholder */}
            <img
              src={Logo}
              alt="logo"
              className="w-[110px] h-[110px] object-contain"
            />
          </div>

          <h1 className="text-[24px] font-extrabold text-white drop-shadow-md">
            Reset Password
          </h1>
          <p className="mt-2 text-[16px] text-white/80">
         Enter email to get password recovery link with 4 digit code
          </p>

          <form
            className="w-full mt-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <div className="w-full rounded-lg px-2 gap-1 py-2 text-sm placeholder-white/60 bg-white/10 border border-white/20 flex flex-col items-start justify-start">
              <label className="text-white text-start text-[14px] font-extralight ">Email</label>
                <input
                  type="email"
                  defaultValue="Davidschumate@gmail.com"
                  className="w-full rounded-lg  text-[14px] font-[500 ] placeholder-white/60 text-white focus:outline-none bg-transparent"
                />
              </div>
            </div>

           

          

            <div>
              <button onClick={() => navigate("/auth/otp-verification")} className="w-full py-3 rounded-md bg-[#0b89c6] text-white font-[500] shadow-inner">
            Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestPassword;
