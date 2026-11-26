import { useRef } from "react";
import { gsap, MOTION_DESKTOP, ScrollTrigger, useGSAP } from "../../motion/gsap.ts";
import "./AltitudeLine.css";

const START_METRES = 10000;

/** A hairline that fills as you descend, with an altitude readout: ∞ at the top, 0 at the footer. */
export function AltitudeLine() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION_DESKTOP, () => {
                const readout = ref.current!.querySelector("output")!;
                const fill = ref.current!.querySelector(".altitude__fill");
                ScrollTrigger.create({
                    start: 0,
                    end: "max",
                    onUpdate: ({ progress }) => {
                        gsap.set(fill, { scaleY: progress });
                        readout.textContent =
                            progress < 0.005
                                ? "∞"
                                : Math.round((1 - progress) * START_METRES).toString();
                    },
                });
            });
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className="altitude" aria-hidden="true">
            <span className="altitude__track">
                <span className="altitude__fill" />
            </span>
            <span className="altitude__label">
                ALT <output>∞</output> M
            </span>
        </div>
    );
}
