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
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => ref.current?.style.setProperty("--sky-scroll", String(self.scroll())),
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
