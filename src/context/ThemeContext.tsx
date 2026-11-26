/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
    const requested = new URLSearchParams(window.location.search).get("theme");
    if (requested === "light" || requested === "dark") return requested;

    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        document
            .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
            ?.setAttribute("content", theme === "dark" ? "#05070d" : "#f5f6f8");
    }, [theme]);

    // Until the visitor picks a theme, keep following the system light/dark setting live.
    useEffect(() => {
        const query = matchMedia("(prefers-color-scheme: dark)");
        const follow = () => {
            if (!localStorage.getItem("theme")) setTheme(query.matches ? "dark" : "light");
        };
        query.addEventListener("change", follow);
        return () => query.removeEventListener("change", follow);
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            setTheme,
            toggleTheme: () =>
                setTheme((current) => {
                    const next = current === "dark" ? "light" : "dark";
                    localStorage.setItem("theme", next);
                    return next;
                }),
        }),
        [theme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
