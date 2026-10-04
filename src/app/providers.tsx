import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../context/LanguageContext.tsx";
import { ThemeProvider } from "../context/ThemeContext.tsx";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </LanguageProvider>
        </ThemeProvider>
    );
}
