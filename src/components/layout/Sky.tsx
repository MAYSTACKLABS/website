import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../motion/gsap.ts";
import "./Sky.css";

/**
 * The descending sky: one sky behind the whole site that changes as you scroll, from deep
 * night at the top of the page to first light by the footer — from idea to launch.
 * Three fixed colour layers crossfade (opacity only, so it costs the browser almost nothing),
 * a warm glow rises at the horizon near the end, and the stars thin out as day comes.
 */
export function Sky() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sky = ref.current!;
        const q = gsap.utils.selector(sky);

        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { start: 0, end: "max", scrub: 0.5 },
        });
        tl.to(q(".sky__phase--2"), { opacity: 1, duration: 0.5 }, 0)
            .to(q(".sky__phase--3"), { opacity: 1, duration: 0.5 }, 0.5)
            .to(q(".sky__glow"), { opacity: 1, duration: 0.45 }, 0.55)
            .to(q(".sky__starfield"), { opacity: 0.25, duration: 0.6 }, 0.4);

        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // Stars drift by transform (GPU) and wrap after one tile.
        const fields = [
            { el: q(".sky__stars--far")[0], speed: 0.04, tile: 380 },
            { el: q(".sky__stars--near")[0], speed: 0.12, tile: 620 },
            { el: q(".sky__stars--twinkle")[0], speed: 0.2, tile: 760 },
        ];
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                const y = self.scroll();
                for (const f of fields) f.el.style.transform = `translate3d(0, ${-((y * f.speed) % f.tile)}px, 0)`;
            },
        });
    });

    return (
        <div ref={ref} className="sky" aria-hidden="true">
            <div className="sky__phase sky__phase--1" />
            <div className="sky__phase sky__phase--2" />
            <div className="sky__phase sky__phase--3" />
            <div className="sky__glow" />
            <div className="sky__starfield">
                <div className="sky__stars sky__stars--far" />
                <div className="sky__stars sky__stars--near" />
                <div className="sky__stars sky__stars--twinkle" />
            </div>
        </div>
    );
}
