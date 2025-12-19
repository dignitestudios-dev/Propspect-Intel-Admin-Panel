// In sidebarData.js
import { Home, User } from "lucide-react"; // Import required icons
import { FaBroom } from "react-icons/fa";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <Home className="w-[18px] h-[18px]" />,  // Add icon here
    link: "dashboard",
  },
  {
    title: "Users",
    icon: <User className="w-[18px] h-[18px]" />,  // Add icon here
    link: "/app/users",
  },
  {
    title: "Atheletes",
    icon: <FaBroom className="w-[18px] h-[18px]" />,  // Add icon here
    link: "/app/atheletes",
  },
   {
    title: "Notifications",
    icon: <FaBroom className="w-[18px] h-[18px]" />,  // Add icon here
    link: "/app/notifications",
  },
];
