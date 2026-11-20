import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/bebas-neue/latin-400.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-800.css";
import "./index.css";
import "./styles/global.css";
import "./i18n/index.ts";
import App from "./app/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
