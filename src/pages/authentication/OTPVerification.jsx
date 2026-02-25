import { useState, useRef, useEffect } from "react";
import { Logo } from "../../assets/export";
import { FiLoader } from "react-icons/fi";
import CountDown from "../../components/global/CountDown";
import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const navigate = useNavigate();
  const inputs = useRef([]);

  // Handle OTP input change
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

  // Handle backspace
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

  // Handle paste
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    if (/^\d{4}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
    }
    e.preventDefault();
  };

  // Auto verify OTP when all 4 digits are filled
  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === 4 && !otp.includes("")) {
      verifyOtp(otpString);
    }
  }, [otp]);

  // Verify OTP
  const verifyOtp = async (otpString) => {
    if (loading) return;

    setLoading(true);
    try {
      // Example API call
      // const response = await axios.post("/auth/verify-otp", { otp: otpString });
      // if (response.status === 200) {
      SuccessToast("OTP verified successfully!");
      navigate("/auth/change-password");
      // }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "OTP verification failed");
      setOtp(Array(4).fill("")); 
      inputs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = () => {
    setIsActive(true);
    setSeconds(60);
    SuccessToast("OTP resent successfully!");
    setOtp(Array(4).fill(""));
    inputs.current[0].focus();
  };

  return (

    <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black/70 backdrop-blur-md border border-white/20 p-8 md:p-10 lg:p-12">

      {/* Logo */}
      <div className="flex flex-col items-center text-center mb-4">
        <img src={Logo} alt="logo" className="w-28 h-28 md:w-32 md:h-32 object-contain mb-4" />
        <p className="mt-2 text-white/80 text-sm md:text-base">
          Enter the 4 digit code sent to dav*********.com
        </p>
      </div>

      {/* Resend OTP button + countdown */}

      {/* OTP Inputs */}
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
            className="px-4 py-2 bg-[#0b89c6] text-white rounded-md font-medium hover:bg-[#0972a0] transition-colors duration-200"
          >
            Resend Code
          </button>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
          <FiLoader className="animate-spin text-white text-2xl" />
        </div>
      )}
    </div>

  );
};

export default OTPVerification;