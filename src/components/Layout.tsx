import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    useLayoutEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

        if (prefersReducedMotion || isSmallScreen) {
            return;
        }

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.15,
            effects: true,
            normalizeScroll: true,
        });

        return () => {
            smoother.kill();
        };
    }, []);

    useLayoutEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".ms-animate",
                { y: 22 },
                {
                    y: 0,
                    duration: 0.72,
                    ease: "power3.out",
                    stagger: 0.08,
                },
            );

            gsap.utils.toArray<HTMLElement>(".ms-card, .ms-glass-panel").forEach((element) => {
                gsap.fromTo(
                    element,
                    { autoAlpha: 0.82, y: 28 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.62,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 86%",
                            once: true,
                        },
                    },
                );
            });
        });

        return () => {
            ctx.revert();
        };
    }, [location.pathname]);

    return (
        <div className="app-shell ms-app-shell">
            <Navbar />
            <div id="smooth-wrapper" className="smooth-wrapper">
                <div id="smooth-content" className="smooth-content">
                    <main className="main-wrap">{children}</main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
