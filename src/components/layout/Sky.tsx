import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "../../motion/gsap.ts";
import "./Sky.css";

/**
 * One sky behind the whole site. At night two star fields drift at different speeds as the
 * page scrolls, so the stars travel with you through every section.
 */
export function Sky() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // Each field moves by a transform (cheap for the GPU) and wraps after one tile.
        const fields = [
            { el: ref.current!.querySelector<HTMLElement>(".sky__stars--far")!, speed: 0.04, tile: 380 },
            { el: ref.current!.querySelector<HTMLElement>(".sky__stars--near")!, speed: 0.12, tile: 620 },
            { el: ref.current!.querySelector<HTMLElement>(".sky__stars--twinkle")!, speed: 0.2, tile: 760 },
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
            <div className="sky__stars sky__stars--far" />
            <div className="sky__stars sky__stars--near" />
            <div className="sky__stars sky__stars--twinkle" />
        </div>
    );
}
