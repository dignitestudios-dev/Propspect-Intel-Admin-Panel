import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { ReduxProvider } from "./lib/store/provider.jsx";
import AppRouter from "./config/router/AppRouter.jsx";
import "./index.css";
import './App.css'
import Loader from "./components/global/Loader.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <ReduxProvider>
        <ToasterContainer />
        <AppRouter />
      </ReduxProvider>
    </Suspense>
  </StrictMode>
);
