import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        const currentUrl = window.location.href.split("#")[0];
        const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        const openGraphUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
        if (canonical) canonical.href = currentUrl;
        if (openGraphUrl) openGraphUrl.content = currentUrl;

        if (location.hash) {
            requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.hash, location.pathname]);

    useLayoutEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".ms-animate").forEach((element) => {
                gsap.fromTo(
                    element,
                    { autoAlpha: 0.86, y: 22 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.72,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 90%",
                            once: true,
                        },
                    },
                );
            });
        }, document.body);

        return () => {
            ctx.revert();
        };
    }, [location.pathname]);

    return (
        <div className={`app-shell ms-app-shell${isHome ? " is-home" : ""}`}>
            <Navbar />
            <main className="main-wrap">{children}</main>
            <Footer />
        </div>
    );
}

