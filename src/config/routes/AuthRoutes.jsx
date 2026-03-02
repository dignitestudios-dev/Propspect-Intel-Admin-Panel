import { lazy } from "react";

const Login = lazy(() => import("../../pages/authentication/Login"));
const RestPassword = lazy(() => import("../../pages/authentication/RestPassword"));
const OTPVerification = lazy(() => import("../../pages/authentication/OTPVerification"));
const ChangePassword = lazy(() => import("../../pages/authentication/ChangePassword"));


export const AuthRoutes = [
    { path: 'login', element: <Login /> },
    { path: 'rest-password', element: <RestPassword /> },
    { path: 'otp-verification', element: <OTPVerification /> },
    { path: 'change-password', element: <ChangePassword /> },
];

