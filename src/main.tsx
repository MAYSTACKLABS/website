import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./utilities/globals.css";
import { ThemeProvider } from "./utilities/ThemeContext";
import { LanguageProvider } from "./utilities/LanguageContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>

);  