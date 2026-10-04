import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { projects } from "../portfolio/projectsData.ts";
import laptopFrame from "../../assets/generated/laptop-frame-v2.png";

export default function Projects() {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const featured = projects.filter((project) => project.slug !== "maystack");
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = featured[activeIndex];

    const move = (direction: number) => {
        setActiveIndex((current) => (current + direction + featured.length) % featured.length);
    };

    return (
        <section className="ms-home-work" id="projects">
            <div className="ms-container ms-work-layout">
                <div className="ms-work-heading ms-animate">
                    <p>{t("home.work.kicker")}</p>
                    <h2>{lang === "ar" ? t("home.work.title") : <>Proof at<br />every altitude.</>}</h2>
                    <span>{t("home.work.subtitle")}</span>
                    <Link className="ms-outline-cta" to="/portfolio">
                        {t("home.work.all")}
                        <ArrowUpRight aria-hidden="true" />
                    </Link>
                </div>

                <div className="ms-project-stage ms-animate">
                    <Link className="ms-real-laptop" to={`/portfolio/${activeProject.slug}`} aria-label={`${activeProject.title[lang]} case study`}>
                        <div className="ms-real-laptop-screen">
                            <img src={activeProject.cover} alt={activeProject.title[lang]} decoding="async" />
                        </div>
                        <img className="ms-real-laptop-frame" src={laptopFrame} alt="" aria-hidden="true" />
                    </Link>
                </div>

                <div className="ms-project-story ms-animate">
                    <div className="ms-project-story-top">
                        <div className="ms-project-count">
                            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                            <small>/ {String(featured.length).padStart(2, "0")}</small>
                        </div>
                        <div className="ms-project-controls" aria-label={lang === "ar" ? "التنقل بين المشاريع" : "Project navigation"}>
                            <button type="button" onClick={() => move(-1)} aria-label={lang === "ar" ? "المشروع السابق" : "Previous project"}>
                                <ArrowLeft aria-hidden="true" />
                            </button>
                            <button type="button" onClick={() => move(1)} aria-label={lang === "ar" ? "المشروع التالي" : "Next project"}>
                                <ArrowRight aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                        <p className="ms-project-category">{activeProject.category[lang]}</p>
                        <h3>{activeProject.title[lang]}</h3>
                        <p>{activeProject.intro[lang]}</p>
                        <Link className="ms-project-link" to={`/portfolio/${activeProject.slug}`}>
                            {lang === "ar" ? "عرض دراسة الحالة" : "View case study"}
                            <ArrowUpRight aria-hidden="true" />
                        </Link>
                </div>
            </div>
        </section>
    );
}
