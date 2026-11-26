import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import { HeroStack } from "./HeroStack.tsx";
import "./Hero.css";

/** The opening statement, on the open sky. */
export function Hero() {
    const { t } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                // Arrival: the title rises (SplitHeading), then the rest follows.
                gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } }).from(
                    ".hero__fade",
                    { autoAlpha: 0, y: 16, stagger: 0.08 },
                    0.6,
                );

                // Leaving: the copy lifts away.
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                    defaults: { ease: "none" },
                }).to(".hero__copy", { yPercent: -25, autoAlpha: 0 }, 0);
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="hero">
            <div className="hero__inner container">
                <div className="hero__copy">
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
                <HeroStack />
            </div>
        </section>
    );
}
