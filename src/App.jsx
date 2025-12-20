import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/authentication/Login";
import RestPassword from "./pages/authentication/RestPassword";
import OTPVerification from "./pages/authentication/OTPVerification";
import ChangePassword from "./pages/authentication/ChangePassword";
import Dashboard from "./pages/app/dashboard/Dashboard";
import Atheletes from "./pages/app/Atheletes";
import Users from "./pages/app/Users";
import Notifications from "./pages/app/Notifications";
import AthleteDetails from "./pages/app/AtheleteDetails";
import Location from "./pages/app/Location";
import AddAthlete from "./pages/app/AddAthlete";
import AthleteInterests from "./pages/app/AthleteInterests";
import FiltersAnalytics from "./pages/app/FiltersAnalytics";
import SchoolManagement from "./pages/app/SchoolManagement";
import ContactForm from "./pages/app/ContactForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="auth/login" />}></Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="rest-password" element={<RestPassword />} />
        <Route path="otp-verification" element={<OTPVerification />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="athletes" element={<Atheletes />} />
        <Route path="users" element={<Users />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="athlete-details" element={<AthleteDetails />} />
        <Route path="location" element={<Location />} />
        <Route path="add-athlete" element={<AddAthlete />} />
        <Route path="athlete-interests" element={<AthleteInterests />} />
        <Route path="analytic" element={<FiltersAnalytics />} />
        <Route path="school-management" element={<SchoolManagement />} />
        <Route path="contact-form" element={<ContactForm />} />
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
