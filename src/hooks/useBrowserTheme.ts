import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.tsx";

/** Safari's visible viewport changes as its bottom toolbar expands and collapses. */
export function useBrowserTheme() {
    const { pathname } = useLocation();
    const { theme } = useTheme();
    useEffect(() => {
        const sky = pathname === "/" || pathname === "/contact";
        const color = theme === "dark" ? (sky ? "#01041b" : "#030b22") : (sky ? "#0750de" : "#d9eaff");
        const root = document.documentElement;
        let frame = 0;
        const update = () => {
            frame = 0;
            const viewport = window.visualViewport;
            const visibleBottom = (viewport?.pageTop ?? window.scrollY) + (viewport?.height ?? window.innerHeight);
            // Include the toolbar's changing height, rather than waiting for layout-viewport bottom.
            const footer = document.querySelector<HTMLElement>(".ms-footer");
            const atCloudEdge = Boolean(footer) && root.scrollHeight - visibleBottom < 180;
            root.style.setProperty("--browser-background", atCloudEdge ? "#edf5ff" : color);
            root.dataset.browserCloudEdge = String(atCloudEdge);
            document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", atCloudEdge ? "#edf5ff" : color);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        const observer = new ResizeObserver(schedule);
        observer.observe(document.body);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        window.addEventListener("pageshow", schedule);
        window.visualViewport?.addEventListener("scroll", schedule, { passive: true });
        window.visualViewport?.addEventListener("resize", schedule);
        update();
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.removeEventListener("pageshow", schedule);
            window.visualViewport?.removeEventListener("scroll", schedule);
            window.visualViewport?.removeEventListener("resize", schedule);
        };
    }, [pathname, theme]);
}
