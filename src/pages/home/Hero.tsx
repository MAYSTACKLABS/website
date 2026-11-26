import { useRef, useSyncExternalStore } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import mark from "../../assets/logos/white.png";
import { MAIN_EDGE, RIDGES, SUMMIT } from "../../components/mountains.ts";
import "./Hero.css";

// The bird glides in from the lower edge and lands just above the summit.
const PERCH = { x: SUMMIT.x, y: SUMMIT.y - 34 };
const FLIGHT = `M 240 900 C 520 820 760 650 880 500 S ${PERCH.x - 40} ${PERCH.y + 10} ${PERCH.x} ${PERCH.y}`;

// Back to front. Nearer layers travel further as the page scrolls, which gives the depth.
const LAYERS = [
    { key: "far", depth: 40 },
    { key: "mid", depth: 90 },
    { key: "main", depth: 150 },
    { key: "near", depth: 240 },
] as const;

// Phones see a narrow slice of the scene, so they frame it around the summit instead of the centre.
const NARROW = "(max-width: 800px)";
const subscribeNarrow = (onChange: () => void) => {
    const query = matchMedia(NARROW);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};
const isNarrow = () => matchMedia(NARROW).matches;

export function Hero() {
    const narrow = useSyncExternalStore(subscribeNarrow, isNarrow);
    const { t } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const flight = {
                    path: ".hero__flight",
                    align: ".hero__flight",
                    alignOrigin: [0.5, 0.5],
                };

                // Arrival: the range settles back to front, the skyline draws, the bird lands.
                gsap.timeline({ defaults: { duration: 1.6, ease: "power3.out" } })
                    .from(".hero__layer", { y: 50, autoAlpha: 0, stagger: 0.12 })
                    .from(".hero__edge", { drawSVG: 0, duration: 2.2, ease: "power2.inOut" }, 0.2)
                    .fromTo(
                        ".hero__flight",
                        { drawSVG: 0 },
                        { drawSVG: "100%", duration: 2, ease: "power2.inOut" },
                        0.6,
                    )
                    .fromTo(
                        ".hero__bird",
                        { autoAlpha: 0, motionPath: { ...flight, end: 0 } },
                        {
                            autoAlpha: 1,
                            motionPath: { ...flight, start: 0, end: 1 },
                            duration: 2,
                            ease: "power2.inOut",
                        },
                        0.6,
                    )
                    .to(".hero__flight", { autoAlpha: 0.25, duration: 1 }, ">")
                    .from(".hero__fade", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 1 }, 1);

                // Departure: the copy lifts away while the range sinks at different speeds.
                const leave = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.8,
                    },
                    defaults: { ease: "none" },
                });
                leave.to(".hero__copy", { yPercent: -20, autoAlpha: 0 }, 0);
                LAYERS.forEach(({ key, depth }) =>
                    leave.to(`.hero__layer--${key}`, { y: depth }, 0),
                );
                leave.to([".hero__edge", ".hero__flight", ".hero__bird"], { y: 150 }, 0);
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="hero">
            <svg
                className="hero__scene"
                viewBox={narrow ? `${SUMMIT.x - 380} 0 760 900` : "0 0 1440 900"}
                preserveAspectRatio="xMidYMax slice"
                aria-hidden="true"
            >
                <defs>
                    {LAYERS.map(({ key }) => (
                        <linearGradient key={key} id={`hero-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" className={`hero__stop-top--${key}`} />
                            <stop offset="1" className="hero__stop-base" />
                        </linearGradient>
                    ))}
                    <linearGradient id="hero-edge" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" className="hero__stop-fade" />
                        <stop offset="0.45" className="hero__stop-accent" />
                        <stop offset="0.8" className="hero__stop-accent-2" />
                        <stop offset="1" className="hero__stop-fade" />
                    </linearGradient>
                </defs>

                {LAYERS.map(({ key }) => (
                    <path
                        key={key}
                        className={`hero__layer hero__layer--${key}`}
                        d={RIDGES[key]}
                        fill={`url(#hero-${key})`}
                    />
                ))}
                <path className="hero__edge" d={MAIN_EDGE} stroke="url(#hero-edge)" />
                <path className="hero__flight" d={FLIGHT} />
                <image className="hero__bird" href={mark} width="72" height="56" />
            </svg>

            <div className="hero__copy container">
                <p className="eyebrow hero__fade">{t("home.hero.eyebrow")}</p>
                <SplitHeading as="h1" trigger="load" delay={0.3} className="hero__title">
                    {t("home.hero.line1")}
                    <br />
                    {t("home.hero.line2")}
                </SplitHeading>
                <p className="hero__lead hero__fade">{t("home.hero.lead")}</p>
                <div className="hero__actions hero__fade">
                    <ButtonLink to="/contact">{t("cta.start")}</ButtonLink>
                    <ButtonLink to="/portfolio" variant="ghost">
                        {t("cta.work")}
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
