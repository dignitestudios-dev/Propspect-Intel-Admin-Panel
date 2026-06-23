import { lazy } from "react";

const Dashboard = lazy(() => import("../../pages/app/dashboard/Dashboard"));
const Atheletes = lazy(() => import("../../pages/app/Atheletes"));
const Users = lazy(() => import("../../pages/app/Users"));
const Notifications = lazy(() => import("../../pages/app/Notifications"));
const AthleteDetails = lazy(() => import("../../pages/app/AtheleteDetails"));
const Location = lazy(() => import("../../pages/app/Location"));
const AddAthlete = lazy(() => import("../../pages/app/AddAthlete"));
const AthleteInterests = lazy(() => import("../../pages/app/AthleteInterests"));
const FiltersAnalytics = lazy(() => import("../../pages/app/FiltersAnalytics"));
const SchoolManagement = lazy(() => import("../../pages/app/SchoolManagement"));
const ContactForm = lazy(() => import("../../pages/app/ContactForm"));

export const ProtectedRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "athletes", element: <Atheletes /> },
  { path: "users", element: <Users /> },
  { path: "notifications", element: <Notifications /> },
  { path: "athlete-details/:id", element: <AthleteDetails /> },
  { path: "location", element: <Location /> },
  { path: "athleteform", element: <AddAthlete /> },
  { path: "athlete-interests/:id", element: <AthleteInterests /> },
  { path: "analytic", element: <FiltersAnalytics /> },
  { path: "school-management", element: <SchoolManagement /> },
  { path: "contact-form", element: <ContactForm /> },
];
