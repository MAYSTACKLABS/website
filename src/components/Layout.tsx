import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useBrowserTheme } from "../hooks/useBrowserTheme.ts";

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    useBrowserTheme();
    const scenicPage = location.pathname === "/" || location.pathname === "/contact";
    useLayoutEffect(() => {
        document.documentElement.dataset.pageSurface = scenicPage ? "sky" : "paper";
    }, [scenicPage]);
    useEffect(() => {
        if (location.hash) {
            requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }, [location.hash, location.pathname]);
    return <div className={`ms-app-shell${scenicPage ? " has-sky" : " is-paper"}${location.pathname === "/contact" ? " is-contact" : ""}`}>
        <a className="sr-only focus:not-sr-only" href="#main-content">Skip to content</a>
        <Navbar />
        <main className="main-wrap" id="main-content">{children}</main>
        <Footer />
    </div>;
}

