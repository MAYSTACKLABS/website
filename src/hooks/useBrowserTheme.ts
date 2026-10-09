import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.tsx";

/** Keep browser chrome aligned with the selected page theme, without scroll-based color bands. */
export function useBrowserTheme() {
    const { pathname } = useLocation();
    const { theme } = useTheme();
    useEffect(() => {
        const sky = pathname === "/" || pathname === "/contact";
        const color = theme === "dark" ? (sky ? "#01041b" : "#030b22") : (sky ? "#0750de" : "#d9eaff");
        document.documentElement.style.setProperty("--browser-background", color);
        document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", color);
    }, [pathname, theme]);
}
