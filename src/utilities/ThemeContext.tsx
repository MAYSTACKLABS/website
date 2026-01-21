import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
}

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;

    const systemDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return systemDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const setTheme = (t: Theme) => setThemeState(t);
    const toggle = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

    const value = useMemo(() => ({ theme, toggle, setTheme }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}
