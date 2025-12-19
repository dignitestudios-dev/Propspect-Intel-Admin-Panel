// In sidebarData.js
import { Home, User } from "lucide-react"; // Import required icons
import { FaBroom } from "react-icons/fa";
import { CiLocationOn, CiSearch } from "react-icons/ci";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <Home className="w-[18px] h-[18px]" />, // Add icon here
    link: "dashboard",
  },
  {
    title: "User Management",
    icon: <User className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/users",
  },
  {
    title: "Athlete Management",
    icon: <FaBroom className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/athletes",
  },
  {
    title: "Push Notifications",
    icon: <FaBroom className="w-[18px] h-[18px]" />, // Add icon here
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
    icon: <CiSearch className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/school-management",
  },
  {
    title: "Contact Form",
    icon: <CiSearch className="w-[18px] h-[18px]" />, // Add icon here
    link: "/app/contact-form",
  },
];
