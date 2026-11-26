import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { Scenery } from "../../components/Scenery.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import "./Hero.css";

/** The Maystack range in its sea of clouds, with the sun by day and the moon by night. */
export function Hero() {
    const { t } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                // Arrival: the scene fades in as one piece (mountain and clouds never move apart,
                // so the foot of the range can never slip out of the clouds), then the sun or moon rises.
                gsap.timeline({ defaults: { duration: 1.6, ease: "power3.out" } })
                    .from(".hero__scene", { autoAlpha: 0, duration: 1.2 })
                    .from(".scenery__orb", { y: 90, autoAlpha: 0, duration: 2 }, 0.3)
                    .from(".hero__fade", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 1 }, 0.6);

                // The hero holds still while the page slides over it; only the layers drift a
                // little for depth (clouds rise more than the range, so its foot stays hidden).
                gsap.timeline({
                    scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${innerHeight}`, scrub: 0.6 },
                    defaults: { ease: "none" },
                })
                    .to(".hero__copy", { yPercent: -15, autoAlpha: 0 }, 0)
                    .to(".scenery__orb", { y: 24 }, 0)
                    .to(".scenery__range", { y: -12 }, 0)
                    .to(".scenery__clouds", { y: -48 }, 0);
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="hero">
            <Scenery className="hero__scene" orb eager />

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
