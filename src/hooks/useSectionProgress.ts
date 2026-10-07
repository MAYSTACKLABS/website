import { useEffect, useRef } from "react";

/** A single scroll signal, shared by the process connector and its milestones. */
export function useSectionProgress() {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        const paint = () => {
            frame = 0;
            const box = element.getBoundingClientRect();
            const progress = media.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .8 - box.top) / (box.height + innerHeight * .1)));
            element.style.setProperty("--process-progress", String(progress));
            element.dataset.stage = String(Math.floor(progress * 4));
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
        paint();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        media.addEventListener("change", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            media.removeEventListener("change", schedule);
        };
    }, []);
    return ref;
}
