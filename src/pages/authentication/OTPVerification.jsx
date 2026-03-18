import { useState, useRef, useEffect } from "react";
import { Logo } from "../../assets/export";
import { FiLoader } from "react-icons/fi";
import CountDown from "../../components/global/CountDown";
import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axiosinstance from "../../axios";
import Cookies from 'js-cookie'
const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const navigate = useNavigate();
  const inputs = useRef([]);
  const email = localStorage.getItem('email')


  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };


  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    if (/^\d{4}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
    }
    e.preventDefault();
  };


  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === 6 && !otp.includes("")) {
      verifyOtp(otpString);
    }
  }, [otp]);


  const verifyOtp = async (otpString) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosinstance.post("/user/otp/verify", { otp: otpString, email: email });
      if (response.status === 200) {
        SuccessToast("OTP verified successfully!");
        Cookies.set('adminToken', response?.data?.data?.token)
        navigate("/auth/change-password");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "OTP verification failed");
      setOtp(Array(6).fill(""));
      inputs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };
  const resendOtp = async () => {
    setResendLoading(true)
    try {
      const response = await axiosinstance.post("/user/otp/request", {
        email: email,
      });

      if (response.status === 200) {
        SuccessToast("OTP resent successfully!");
        setIsActive(true);
        setSeconds(60);
        setOtp(Array(6).fill(""));
        inputs.current[0].focus();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setResendLoading(false);
    }
  };

  return (

    <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black/70 backdrop-blur-md border border-white/20 p-8 md:p-10 lg:p-12">

      <div className="flex flex-col items-center text-center mb-4">
        <img src={Logo} alt="logo" className="w-28 h-28 md:w-32 md:h-32 object-contain mb-4" />
        <p className="mt-2 text-white/80 text-sm md:text-base">
          Enter the 6 digit code sent to {email || "N/A"}
        </p>
      </div>


      <div className="w-full flex justify-center items-center gap-4">
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputs.current[index] = el)}
            placeholder="_"
            className={`w-14 md:w-16 h-14 md:h-16 rounded-lg bg-gradient-to-b from-black/40 to-black/30 outline-none text-center border border-[#FFFFFF33] text-white text-lg md:text-xl font-medium ${loading ? "opacity-50" : ""
              }`}
            disabled={loading}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {isActive ? (
          <CountDown
            isActive={isActive}
            setIsActive={setIsActive}
            seconds={seconds}
            setSeconds={setSeconds}
          />
        ) : (
          <button
            type="button"
            onClick={resendOtp}
            className="w-full flex items-center justify-center px-4 py-2 bg-[#0b89c6] text-white rounded-md font-medium hover:bg-[#0972a0] transition-colors duration-200"
          >
            {resendLoading && <FiLoader className="animate-spin mr-2" size={20} />}
            {resendLoading ? "Resending..." : "Resend Code"}
          </button>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
          <FiLoader className="animate-spin text-white text-2xl" />
        </div>
      )}
    </div>

  );
};

export default OTPVerification;