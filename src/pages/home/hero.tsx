import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="ms-hero-section" id="home">
            <div className="ms-animate mx-auto max-w-5xl">
                <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl md:text-6xl" style={{ color: "var(--ms-text)" }}>
                    <span className="block">{t("home.hero.titleTop")}</span>
                    <span className="block bg-gradient-to-r from-[#5abce4] via-[#18dbc9] to-[#7dad65] bg-clip-text text-transparent">
                        {t("home.hero.titleAccent")}
                    </span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--ms-muted-text)" }}>
                    {t("home.hero.subtitle")}
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                    <NavLink to="/contact" className="ms-button-primary w-full max-w-72 sm:w-auto">
                        {t("home.hero.ctaPrimary")}
                        <ArrowRight className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="/portfolio" className="ms-button-ghost w-full max-w-72 sm:w-auto">{t("home.hero.ctaSecondary")}</NavLink>
                </div>
            </div>
        </section>
    );
};

export default Hero;
