import { useRef } from "react";
import { gsap, MOTION_DESKTOP, ScrollTrigger, useGSAP } from "../../motion/gsap.ts";
import "./AltitudeLine.css";

const SUMMIT_METRES = 8848;

/** A hairline on the page edge that fills as you scroll, with an altitude readout. */
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
                        readout.textContent = Math.round(progress * SUMMIT_METRES)
                            .toString()
                            .padStart(4, "0");
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
                ALT <output>0000</output> M
            </span>
        </div>
    );
}
