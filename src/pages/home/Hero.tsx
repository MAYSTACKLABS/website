import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import mark from "../../assets/logos/white.png";
import "./Hero.css";

// Scene geometry, in the SVG's 1440 × 900 space. The flight path runs past the top edge
// so the bird can leave the frame as the visitor scrolls on.
const FLIGHT = "M 300 900 C 640 820 980 640 1190 380 S 1440 -40 1540 -120";
const RIDGE =
    "M 0 900 L 160 820 L 290 850 L 450 730 L 590 790 L 800 600 L 940 700 L 1040 660 L 1200 780 L 1320 740 L 1440 810";
const LANDED = 0.72; // how far along the flight path the bird rests after the intro

export function Hero() {
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

                // Arrival: the ridge draws, the trail follows the bird to its resting point.
                gsap.timeline({ defaults: { duration: 2.4, ease: "expo.inOut" } })
                    .from(".hero__ridge", { drawSVG: 0 })
                    .fromTo(
                        ".hero__flight",
                        { drawSVG: 0 },
                        { drawSVG: `0% ${LANDED * 100}%` },
                        0.3,
                    )
                    .fromTo(
                        ".hero__bird",
                        { motionPath: { ...flight, end: 0 } },
                        { motionPath: { ...flight, start: 0, end: LANDED } },
                        0.3,
                    )
                    .from(
                        ".hero__fade",
                        { autoAlpha: 0, y: 24, stagger: 0.1, duration: 1.2, ease: "expo.out" },
                        1.2,
                    );

                // Departure: scrolling away lifts the copy and sends the bird off the top edge.
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                })
                    .to(".hero__copy", { yPercent: -30, autoAlpha: 0, ease: "none" }, 0)
                    .to(".hero__ridge", { y: 120, ease: "none" }, 0)
                    .to(".hero__flight", { drawSVG: "0% 100%", ease: "none" }, 0)
                    .to(
                        ".hero__bird",
                        { motionPath: { ...flight, start: LANDED, end: 1 }, ease: "none" },
                        0,
                    );
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="hero">
            <svg
                className="hero__scene"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMax slice"
                aria-hidden="true"
            >
                <path className="hero__ridge" d={RIDGE} />
                <path className="hero__flight" d={FLIGHT} />
                <image className="hero__bird" href={mark} width="120" height="93" />
            </svg>

            <div className="hero__copy container">
                <p className="eyebrow hero__fade">{t("home.hero.eyebrow")}</p>
                <SplitHeading as="h1" trigger="load" delay={0.4} className="hero__title">
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
