import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { SettingsProvider } from "./components/SettingsProvider";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </SettingsProvider>
  </StrictMode>,
);
