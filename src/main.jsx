import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { ReduxProvider } from "./lib/store/provider.jsx";
import AppRouter from "./config/router/AppRouter.jsx";
import "./index.css";
import './App.css'
import ReactQueryProvider from "./lib/query/ReactQueryProvider.jsx";
import Loader from "./components/global/Loader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <ReduxProvider>
        <ReactQueryProvider>
          <ToasterContainer />
          <AppRouter />
        </ReactQueryProvider>
      </ReduxProvider>
    </Suspense>
  </StrictMode>
);
