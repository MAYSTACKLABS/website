import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import mountains from "../../assets/scene/mountains.webp";
import sun from "../../assets/scene/sun.webp";
import moon from "../../assets/scene/moon.webp";
import "./Hero.css";

/**
 * The Maystack range under the shared sky. The sun rises behind it by day and the moon by
 * night; its foot fades into the sky, so the next section continues without a seam.
 */
export function Hero() {
    const { t } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                gsap.timeline({ defaults: { duration: 1.6, ease: "power3.out" } })
                    .from(".hero__range", { y: 60, autoAlpha: 0 })
                    .from(".hero__orb", { y: 80, autoAlpha: 0, duration: 2 }, 0.2)
                    .from(".hero__fade", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 1 }, 0.8);

                gsap.timeline({
                    scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.8 },
                    defaults: { ease: "none" },
                })
                    .to(".hero__copy", { yPercent: -25, autoAlpha: 0 }, 0)
                    .to(".hero__orb", { y: 140 }, 0)
                    .to(".hero__range", { y: 60 }, 0);
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="hero">
            <div className="hero__scene" aria-hidden="true">
                <div className="hero__orb">
                    <img className="hero__sun" src={sun} alt="" decoding="async" />
                    <img className="hero__moon" src={moon} alt="" decoding="async" />
                </div>
                <img className="hero__range" src={mountains} alt="" fetchPriority="high" />
            </div>

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
