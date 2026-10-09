import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./i18n/config";
import "@fontsource-variable/inter-tight";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./index.css";
import "./motion.css";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
