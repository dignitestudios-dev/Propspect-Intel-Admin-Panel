import { useState } from "react"
import { Logo } from "../../assets/export"
import { ErrorToast } from "../../components/global/Toaster"
import { useRef } from "react"
import { FiLoader } from "react-icons/fi"
import CountDown from "../../components/global/CountDown"
import { useNavigate } from "react-router"

const OTPVerification = () => {
    const [otp ,setOtp] = useState(Array(4).fill(""))
    const navigate = useNavigate();
 const inputs = useRef([]);
 const [isActive, setIsActive] = useState(false);
 const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);
    const verifyOtp = async () => {
    if (loading) return;
navigate("/auth/change-password")
    const otpString = otp.join('');
    if (otpString.length !== 5) {
      ErrorToast('Please enter a 5-digit OTP');
      return;
    }   

    }

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
    if (pastedData.length === otp.length) {
      setOtp(pastedData.split(""));
    }
    e.preventDefault();
  };
    return (
        <div className="relative z-10 w-full max-w-xl mx-4 rounded-2xl overflow-hidden shadow-2xl">
             {/* frosted glass panel */}
             <div className="bg-gradient-to-b from-black/50 to-black/30 border border-white/10 p-10 rounded-2xl backdrop-blur-md">
               <div className="w-full flex flex-col items-center text-center">
                 <div className="mb-4 flex items-center justify-center">
                   {/* logo placeholder */}
                   <img
                     src={Logo}
                     alt="logo"
                     className="w-[110px] h-[110px] object-contain"
                   />
                 </div>
       
                 
                 <p className="mt-2 text-[16px] text-white/80">
         Enter the 4 digit code send to dav*********.com
                 </p>
       
                 <form
                   className="w-full mt-6 space-y-4"
                   onSubmit={(e) => e.preventDefault()}
                 >
                  <div className="w-full h-auto flex justify-center items-center gap-4">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  placeholder="_"
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-[96.25px] h-[60px] rounded-[8px] bg-gradient-to-b from-black/40 to-black/30 outline-none text-center border-[1px] border-[#FFFFFF33] text-white text-[16px]  flex items-center justify-center font-[400]"
                />
              );
            })}
          </div>
       
                  
       
                 
       
          
                   <div  className="w-full justify-center items-center  px-7">

          <p className="font-normal text-[13px] flex gap-2 leading-[19px] text-[#FFFFFF]  mx-auto">
      
            {isActive ? (
              < CountDown
                isActive={isActive}
                setIsActive={setIsActive}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            ) : (
              <button
              onClick={verifyOtp}
                type="button"
              
                className="outline-none text-[14px] border-none text-[#FFFFFF] bg-[#0b89c6] px-4 py-4 rounded-[8px] font-[500]"
              >
              Resend Code
              </button>
            )}
          </p>
                   </div>
                 </form>
               </div>
             </div>
           </div>
    )
}
export default OTPVerification
