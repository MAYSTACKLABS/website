import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../../context/LanguageContext.tsx";
import HeroScene from "./HeroScene.tsx";
import HeroTransition from "./HeroTransition.tsx";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const root = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation();
    const { lang } = useLanguage();

    useLayoutEffect(() => {
        if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const context = gsap.context(() => {
            gsap.timeline({ defaults: { ease: "power4.out" } })
                .from(".ms-alpine-copy > *", { y: 28, opacity: 0, duration: 1.05, stagger: 0.1 })
                .from(".ms-alpine-mountain-entrance", { yPercent: 14, scale: 1.035, duration: 1.35 }, 0.12)
                .from(".ms-hero-transition-entrance", { yPercent: 18, duration: 1.35 }, 0.18)
                .from(".ms-alpine-orbit-entrance", { opacity: 0, scale: 0.96, duration: 1.25 }, 0.14)
                .from(".ms-alpine-brand-entrance", { xPercent: -13, opacity: 0, duration: 1.25 }, 0.28)
                .fromTo(
                    ".ms-alpine-orbit-path ellipse",
                    { strokeDasharray: 1280, strokeDashoffset: 1280 },
                    { strokeDashoffset: 0, duration: 2.2, ease: "power3.out" },
                    0.28,
                );

            gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: root.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.15,
                },
            })
                .to(".ms-alpine-orbit-parallax", { yPercent: 4.5 }, 0)
                .to(".ms-alpine-brand-parallax", { xPercent: 3, yPercent: -10 }, 0)
                .to(".ms-alpine-mountain-parallax", { yPercent: 2.6 }, 0)
                .to(".ms-hero-transition-parallax", { yPercent: 1.6 }, 0);
        }, root);

        return () => context.revert();
    }, []);

    return (
        <div className="ms-hero-shell" ref={root}>
            <section className="ms-alpine-hero" id="home">
                <HeroScene mountainAlt={lang === "ar" ? "قمم جبلية زرقاء متدرجة" : "Layered blue mountain peaks"} />
                <div className="ms-alpine-copy">
                    <h1 className="ms-alpine-title">
                        <span>{t("home.hero.titleTop")}</span>
                        <span>{t("home.hero.titleAccent")}</span>
                    </h1>
                    <p className="ms-alpine-kicker">{t("home.hero.badgeLine")}</p>
                    <div className="ms-alpine-actions">
                        <NavLink className="ms-alpine-button ms-alpine-button-primary" to="/contact">
                            {t("home.hero.ctaPrimary")}
                        </NavLink>
                        <NavLink className="ms-alpine-button ms-alpine-button-secondary" to="/portfolio">
                            {t("home.hero.ctaSecondary")}
                        </NavLink>
                    </div>
                </div>
            </section>
            <HeroTransition />
        </div>
    );
}
