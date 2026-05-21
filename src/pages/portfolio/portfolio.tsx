import { type CSSProperties, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { type ProjectKind, projects } from "./projectsData.ts";

type FilterKey = "all" | ProjectKind;

const filters: Array<{ key: FilterKey; label: { en: string; ar: string } }> = [
    { key: "all", label: { en: "All Projects", ar: "كل المشاريع" } },
    { key: "website", label: { en: "Websites", ar: "المواقع" } },
    { key: "platform", label: { en: "Platforms", ar: "المنصات" } },
    { key: "mobile", label: { en: "Mobile Apps", ar: "تطبيقات الموبايل" } },
];

const Portfolio = () => {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
    const visibleProjects = useMemo(
        () => activeFilter === "all" ? projects : projects.filter((project) => project.kinds.includes(activeFilter)),
        [activeFilter],
    );

    return (
        <div className="ms-page portfolio-page" id="work">
            <section className="portfolio-hero ms-animate px-5 pb-14 pt-24 text-center md:pb-16 md:pt-28">
                <div className="ms-container">
                    <h1 className="text-4xl font-bold leading-tight md:text-6xl" style={{ color: "var(--ms-text)" }}>
                        {t("portfolio.titlePrefix")} <span className="text-[#18dbc9]">{t("portfolio.titleAccent")}</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--ms-muted-text)" }}>
                        {t("portfolio.subtitle")}
                    </p>
                    <div className="portfolio-filter-row">
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                type="button"
                                onClick={() => setActiveFilter(filter.key)}
                                className={activeFilter === filter.key ? "ms-filter is-selected" : "ms-filter"}
                            >
                                {filter.label[lang]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 pb-24">
                <div className="portfolio-card-grid mx-auto max-w-[1180px]">
                    {visibleProjects.map((project) => (
                        <Link
                            key={project.slug}
                            to={`/portfolio/${project.slug}`}
                            className="portfolio-work-card"
                            style={{ "--project-accent": project.accent } as CSSProperties}
                        >
                            <div className="portfolio-work-visual">
                                <img src={project.cover} alt={project.title[lang]} />
                            </div>

                            <div className="portfolio-work-copy">
                                <span>{project.category[lang]}</span>
                                <h2>{project.title[lang]}</h2>
                                <p>{project.intro[lang]}</p>
                                <div className="portfolio-work-action" aria-hidden="true">
                                    <ArrowUpRight className="h-5 w-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
