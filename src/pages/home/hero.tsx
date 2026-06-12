import { type CSSProperties, type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import coreIstanbulImage from "../../assets/images/coreistanbul.png";
import growthlineImage from "../../assets/images/growthline.png";
import hopeTeamImage from "../../assets/images/hopeteam.png";
import maystackImage from "../../assets/images/maystack.png";
import studentPlatformImage from "../../assets/images/studentplatform.png";

const heroProjects = [
    {
        accent: "#18dbc9",
        category: { en: "Agency Website", ar: "موقع وكالة" },
        image: maystackImage,
        slug: "maystack",
        title: { en: "Maystack Website", ar: "موقع مايستاك" },
    },
    {
        accent: "#20a8d8",
        category: { en: "Student Management Dashboard", ar: "لوحة إدارة الطلاب" },
        image: studentPlatformImage,
        slug: "snowball",
        title: { en: "Snowball Platform", ar: "منصة سنوبول" },
    },
    {
        accent: "#0bbf7a",
        category: { en: "Business Website", ar: "موقع أعمال" },
        image: growthlineImage,
        slug: "growthline",
        title: { en: "Growthline", ar: "جروث لاين" },
    },
    {
        accent: "#ff8a21",
        category: { en: "Brand Website", ar: "موقع هوية" },
        image: coreIstanbulImage,
        slug: "core",
        title: { en: "Core Istanbul", ar: "كور إسطنبول" },
    },
    {
        accent: "#62d36b",
        category: { en: "Community Website", ar: "موقع مجتمعي" },
        image: hopeTeamImage,
        slug: "hope-team",
        title: { en: "Hope Team", ar: "هوب تيم" },
    },
];

const Hero = () => {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [activeSlide, setActiveSlide] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const dragState = useRef({ dragged: false, startX: 0 });
    const accent = t("home.hero.titleAccent");
    const projectSlides = useMemo(
        () => heroProjects.map((project) => ({
            ...project,
            category: project.category[lang],
            title: project.title[lang],
        })),
        [lang],
    );
    const slideCount = projectSlides.length;

    useEffect(() => {
        if (slideCount < 2 || isInteracting) return;

        const rotation = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slideCount);
        }, 4200);

        return () => window.clearInterval(rotation);
    }, [isInteracting, slideCount]);

    const moveSlide = (direction: -1 | 1) => {
        setActiveSlide((current) => (current + direction + slideCount) % slideCount);
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        if ((event.target as HTMLElement).closest(".hero-project-dots")) return;

        dragState.current = { dragged: false, startX: event.clientX };
        setIsInteracting(true);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!isInteracting) return;
        dragState.current.dragged ||= Math.abs(event.clientX - dragState.current.startX) > 7;
    };

    const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
        if (!isInteracting) return;

        const distance = event.clientX - dragState.current.startX;
        if (Math.abs(distance) > 28) {
            moveSlide(distance < 0 ? 1 : -1);
        }

        window.setTimeout(() => setIsInteracting(false), 120);
    };

    const getSlidePosition = (index: number) => {
        const offset = (index - activeSlide + slideCount) % slideCount;
        if (offset === 0) return "is-center";
        if (offset === 1) return "is-right";
        if (offset === slideCount - 1) return "is-left";
        if (offset === slideCount - 2) return slideCount > 4 ? "is-far-left" : "is-far-right";
        if (offset === 2) return "is-far-right";
        return "is-hidden";
    };

    return (
        <section className="ms-hero-section" id="home">
            <div className="ms-animate mx-auto max-w-5xl">
                <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl md:text-6xl" style={{ color: "var(--ms-text)" }}>
                    <span className="block">{t("home.hero.titleTop")}</span>
                    <span className="block bg-gradient-to-r from-[#5abce4] via-[#18dbc9] to-[#7dad65] bg-clip-text text-transparent">{accent}</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--ms-muted-text)" }}>
                    {t("home.hero.subtitle")}
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                    <NavLink to="/contact" className="ms-button-primary w-full max-w-72 sm:w-auto">
                        {t("home.hero.ctaPrimary")}<ArrowRight className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="/portfolio" className="ms-button-ghost w-full max-w-72 sm:w-auto">{t("home.hero.ctaSecondary")}</NavLink>
                </div>
            </div>

            <div className="hero-project-showcase" aria-label={lang === "ar" ? "أعمال مختارة" : "Selected work"}>
                <div className="hero-project-heading">
                    <span>{lang === "ar" ? "أعمال مميزة" : "Featured Work"}</span>
                </div>
                <div
                    className={`hero-project-stage${isInteracting ? " is-dragging" : ""}`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {projectSlides.map((project, index) => (
                        <NavLink
                            key={`${project.slug}-${index}`}
                            to={`/portfolio/${project.slug}`}
                            className={`hero-project-preview ${getSlidePosition(index)}`}
                            style={{ "--project-accent": project.accent } as CSSProperties}
                            aria-label={project.title}
                            draggable={false}
                            onClick={(event) => {
                                if (dragState.current.dragged) event.preventDefault();
                            }}
                        >
                            <img className="hero-project-background" src={project.image} alt="" draggable={false} />
                            <span className="hero-project-card-meta">
                                <strong>{project.title}</strong>
                                <small>{project.category}</small>
                                <em>{lang === "ar" ? "عرض دراسة الحالة ←" : "View Case Study →"}</em>
                            </span>
                        </NavLink>
                    ))}
                    <div className="hero-project-dots">
                        {projectSlides.map((project, index) => (
                            <button
                                key={`${project.slug}-dot-${index}`}
                                type="button"
                                className={index === activeSlide ? "is-active" : ""}
                                aria-label={`${lang === "ar" ? "عرض" : "Show"} ${project.title}`}
                                onClick={() => setActiveSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
