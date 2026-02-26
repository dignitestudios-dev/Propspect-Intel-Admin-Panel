import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { ReduxProvider } from "./lib/store/provider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <ToasterContainer />
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
