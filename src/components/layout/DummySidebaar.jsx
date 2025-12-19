import { NavLink, useNavigate } from "react-router"; // Correct import for react-router-dom v6
import { useState } from "react";
import { sidebarData } from "../../static/Sidebar"; // Import the sidebar data
import { LogOut } from "lucide-react"; // Import logout icon
import { Logo } from "../../assets/export"; // Import your logo

const DummySidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handle logout function
  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    localStorage.clear();
    sessionStorage.clear();
    navigate("/auth/login");
  };

  return (
    <aside className="w-[260px] h-screen  flex flex-col px-4 py-6">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <img
          src={Logo}
          alt="Prospect Intel"
          className="h-[90px] w-auto cursor-pointer"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {sidebarData?.map((sidebar) => (
          <NavLink
            key={sidebar.link}
            to={sidebar.link}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-white text-[#1E88E5] shadow-sm"
                  : "text-[#1F2937] hover:bg-white/60"
              }`
            }
          >
            {/* Render the icon dynamically */}
            <span className="flex items-center justify-center w-[18px] h-[18px]">
              {sidebar.icon}
            </span>
            <span>{sidebar.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 px-4 py-3 rounded-full w-full text-sm font-medium text-[#1F2937] hover:bg-white/60 transition"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </button>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[340px] shadow-lg">
            <h2 className="text-base font-semibold text-gray-800 mb-5">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DummySidebar;
