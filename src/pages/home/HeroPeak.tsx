import { useRef } from "react";
import bird from "../../assets/logos/white.png";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import "./HeroPeak.css";

/* Layered ridges, back to front; each fades from its colour into mist at the bottom. */
const RIDGES = [
    { key: "far", d: "M0 520 L140 470 L260 455 L400 410 L520 400 L640 360 L760 380 L900 330 L1040 350 L1200 320 V760 H0 Z" },
    { key: "main", d: "M260 760 L470 560 L560 500 L640 440 L720 360 L790 290 L840 232 L890 280 L960 330 L1040 380 L1120 410 L1200 440 V760 Z" },
    { key: "side", d: "M80 760 L260 600 L360 560 L470 500 L560 540 L660 600 L760 660 V760 Z" },
    { key: "right", d: "M720 760 L860 640 L960 560 L1060 520 L1140 540 L1200 560 V760 Z" },
    { key: "near", d: "M0 760 L120 700 L260 680 L400 640 L520 670 L660 650 L820 690 L980 660 L1100 680 L1200 660 V760 Z" },
] as const;

/**
 * The opening scene: misty layered peaks under a pale sun (by day) or moon (by night), with
 * the Maystack bird gliding above the summit. Vector, so it stays sharp and follows the theme.
 */
export function HeroPeak() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                gsap.timeline({ defaults: { ease: "power3.out" } })
                    .from(".peak__orb", { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 50%", duration: 2 })
                    .from(".peak__ridge", { autoAlpha: 0, y: 40, stagger: 0.12, duration: 1.6 }, 0.1)
                    .from(".peak__bird", { autoAlpha: 0, x: -80, y: 30, duration: 2.2, ease: "power2.out" }, 0.6);

                // The bird keeps gliding: a slow, small drift and a gentle bank.
                gsap.to(".peak__bird", {
                    x: "+=18",
                    y: "-=10",
                    rotation: -4,
                    duration: 4,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: 2.8,
                });

                // Scrolling away: the ridges sink into the mist at different speeds.
                gsap.utils.toArray<SVGPathElement>(".peak__ridge").forEach((ridge, i) =>
                    gsap.to(ridge, {
                        y: 20 + i * 18,
                        ease: "none",
                        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 },
                    }),
                );
            });
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className="peak" aria-hidden="true">
            <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMax meet">
                <defs>
                    <radialGradient id="peak-orb" cx="0.5" cy="0.45" r="0.55">
                        <stop offset="0" className="peak__orb-in" />
                        <stop offset="1" className="peak__orb-out" />
                    </radialGradient>
                    {RIDGES.map(({ key }) => (
                        <linearGradient key={key} id={`peak-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" className={`peak__top peak__top--${key}`} />
                            <stop offset="0.55" className={`peak__top peak__top--${key}`} />
                            <stop offset="1" className="peak__mist" />
                        </linearGradient>
                    ))}
                </defs>

                <circle className="peak__orb" cx="830" cy="300" r="225" fill="url(#peak-orb)" />
                {RIDGES.map(({ key, d }) => (
                    <path key={key} className={`peak__ridge peak__ridge--${key}`} d={d} fill={`url(#peak-${key})`} />
                ))}
                {/* Light on the summit's left face. */}
                <path className="peak__ridge peak__snow" d="M840 232 L790 290 L748 338 L792 306 L816 296 L840 262 Z" />
            </svg>
            <img className="peak__bird" src={bird} alt="" />
        </div>
    );
}
