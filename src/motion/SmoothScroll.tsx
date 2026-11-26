import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../i18n/useLocale.ts";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap.ts";
import { scroller } from "./lenis.ts";

/** Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger reads the same position. */
export function SmoothScroll({ children }: { children: ReactNode }) {
    const { pathname, hash } = useLocation();
    const { lang } = useLocale();

    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ anchors: true, autoRaf: false });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        scroller.lenis = lenis;

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            scroller.lenis = null;
        };
    }, []);

    // New page: start at the top (or at the #anchor), then let ScrollTrigger measure the new layout.
    useEffect(() => {
        const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
        if (scroller.lenis) scroller.lenis.scrollTo(target ?? 0, { immediate: true });
        else if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, [pathname, hash, lang]);

    return children;
}
