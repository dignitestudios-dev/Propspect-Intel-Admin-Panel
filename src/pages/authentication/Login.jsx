import { useState } from "react";
// import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/dummyLoginValues";
import { signInSchema } from "../../schema/authentication/dummyLoginSchema";
import { NavLink, useNavigate } from "react-router";
// import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // const { loading, postData } = useLogin();

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
            Admin Panel
          </h1>
          <p className="mt-2 text-[16px] text-white/80">
            Mangage Prospect Intel website. Adminn Portal
          </p>

          <form
            className="w-full mt-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <div className="w-full rounded-lg px-2 gap-1 py-2 text-sm placeholder-white/60 bg-white/10 border border-white/20 flex flex-col items-start justify-start">
                <label className="text-white text-start text-[14px] font-extralight ">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="Davidschumate@gmail.com"
                  className="w-full rounded-lg  text-[14px] font-[500 ] placeholder-white/60 text-white focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <div className="w-full rounded-lg px-2 gap-1 py-2 text-sm placeholder-white/60 bg-white/10 border border-white/20 flex flex-col items-start justify-start relative">
                <label className="text-white text-start text-[14px] font-extralight ">
                  Password
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  defaultValue="password"
                  className="w-full rounded-lg  text-[14px] font-[500 ] placeholder-white/60 text-white focus:outline-none bg-transparent "
                />
                <button
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                >
                  {isPasswordVisible ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="text-left">
              <NavLink
                to="/auth/rest-password"
                className="text-sm font-medium text-white underline"
              >
                Forgot Password?
              </NavLink>
            </div>

            <div>
              <button
                onClick={() => navigate("/app/dashboard")}
                className="w-full py-3 rounded-md bg-[#0b89c6] text-white font-[500] shadow-inner"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
