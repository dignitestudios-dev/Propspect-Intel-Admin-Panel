import { useState } from "react";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/dummyLoginValues";
import { signInSchema } from "../../schema/authentication/dummyLoginSchema";
import { NavLink, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";
import axiosinstance from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../lib/store/hook";
import { login } from "../../lib/store/feature/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await axiosinstance.post("/user/login", {
            email: values.email,
            password: values.password,
            role: 'Admin',
          });
          if (response.status === 200) {
            const data = response?.data?.data;

            dispatch(
              login({
                token: data?.token,
                user: data?.user,
              })
            );
            SuccessToast(response.data?.message || "Login Successful");

            navigate("/app/dashboard");
          }
        } catch (error) {
          ErrorToast(error?.response?.data?.message || "Login failed. Try again.");
        } finally {
          setLoading(false);
        }
      },
    });

  return (


    <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black/30  backdrop-blur-md border border-white/20 p-8 md:p-10 lg:p-4">

      <div className="flex flex-col items-center text-center mb-6">
        <img src={Logo} alt="logo" className="w-28 h-28 md:w-32 md:h-32 object-contain mb-4" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">Admin Panel</h1>
        <p className="mt-2 text-white/80 text-sm md:text-base">Manage Prospect Intel website. Admin Portal</p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white text-sm md:text-base font-light mb-1">Email</label>
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

        <div className="flex flex-col">
          <label className="text-white text-sm md:text-base font-light mb-1">Password</label>
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className={`w-full pr-10 px-3 py-3 md:py-4 rounded-md text-white placeholder-white/60 bg-white/10 border 
        ${errors.password && touched.password ? "border-red-500" : "border-white/20"} 
        focus:outline-none focus:ring-2 focus:ring-[#0b89c6] text-sm md:text-base`}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            >
              {isPasswordVisible ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="text-right">
          <NavLink
            to="/auth/rest-password"
            className="text-sm md:text-base text-[#0b89c6] hover:underline"
          >
            Forgot Password?
          </NavLink>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 md:py-4 bg-[#0b89c6] rounded-md text-white font-semibold shadow-inner hover:bg-[#0972a0] transition-colors duration-200 disabled:opacity-70 text-sm md:text-base"
        >
          {loading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>


  );
};

export default Login;