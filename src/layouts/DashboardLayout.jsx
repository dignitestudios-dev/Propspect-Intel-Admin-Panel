import { Outlet } from "react-router";
import DummyNavbar from "../components/layout/DummyNavbar";
import DummySidebaar from "../components/layout/DummySidebaar";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      // Handle no internet connection
      setOpenNoInternet(true);
    }
  }, []);
  return (
    <div className="w-full min-h-screen h-full flex justify-start items-start bg-[#EAEEF8] overflow-auto">
    
      <div className="w-full h-screen flex justify-start items-start">
        <div className="w-60 h-[calc(100%-2.5rem)] ">
          <DummySidebaar />
        </div>
        <div className="w-[calc(100%-15rem)] h-[calc(100%-2.5rem)] m-4 p-4 pr-2 border-2 border-white  rounded-[24px] overflow-auto">
          <div className="pb-4">
            <DummyNavbar />
          </div>
          
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
