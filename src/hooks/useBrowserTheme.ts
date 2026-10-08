import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.tsx";

/** Keep the browser's exposed canvas in sync with the page edge, including iOS overscroll. */
export function useBrowserTheme() {
    const { pathname } = useLocation();
    const { theme } = useTheme();
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const root = document.documentElement;
            const atBottom = window.scrollY > 0 && root.scrollHeight - window.scrollY - window.innerHeight <= 80;
            const sky = pathname === "/" || pathname === "/contact";
            const color = atBottom ? "#d5e7fb" : theme === "dark" ? (sky ? "#01041b" : "#030b22") : (sky ? "#0750de" : "#d9eaff");
            root.style.setProperty("--browser-background", color);
            root.dataset.pageEdge = atBottom ? "bottom" : "page";
            document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", color);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        const resize = new ResizeObserver(schedule);
        resize.observe(document.body);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        window.visualViewport?.addEventListener("resize", schedule);
        update();
        return () => {
            cancelAnimationFrame(frame);
            resize.disconnect();
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.visualViewport?.removeEventListener("resize", schedule);
        };
    }, [pathname, theme]);
}
