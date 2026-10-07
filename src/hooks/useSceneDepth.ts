import { useEffect, useRef } from "react";

/** Bounded scene-only movement keeps the cloud occlusion intact. */
export function useSceneDepth() {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const media = matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        const paint = () => {
            frame = 0;
            const rect = element.getBoundingClientRect();
            const depth = media.matches ? 0 : Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight));
            element.style.setProperty("--mountain-depth", `${depth * 14}px`);
            element.style.setProperty("--cloud-depth", `${depth * 5}px`);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
        paint();
        addEventListener("scroll", schedule, { passive: true });
        addEventListener("resize", schedule);
        media.addEventListener("change", schedule);
        return () => { cancelAnimationFrame(frame); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); media.removeEventListener("change", schedule); };
    }, []);
    return ref;
}
