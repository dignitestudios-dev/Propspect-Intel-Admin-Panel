// In sidebarData.js
import { Home, User } from "lucide-react"; // Import required icons
import { FaBroom } from "react-icons/fa";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { LayoutDashboard } from "lucide-react";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { LuSchool } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="w-[18px] h-[18px]" />, // Add icon here
    link: "dashboard",
  },
  {
    title: "User Management",
    icon: <CiUser className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/users",
  },
  {
    title: "Athlete Management",
    icon: <IoAmericanFootballOutline className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/athletes",
  },
  {
    title: "Push Notifications",
    icon: <IoMdNotificationsOutline className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/notifications",
  },
  {
    title: "Login Location",
    icon: <CiLocationOn className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/location",
  },
  {
    title: "Filter Analytics",
    icon: <CiSearch className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/analytic",
  },
  {
    title: "School Management",
    icon: <LuSchool className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/school-management",
  },
  {
    title: "Contact Form",
    icon: <IoDocumentTextOutline className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/contact-form",
  },
];
