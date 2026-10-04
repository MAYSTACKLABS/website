import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { type ProjectKind, projects } from "./projectsData.ts";
import { projectCaseStudies } from "./projectCaseStudies.ts";
import FlightCta from "../home/FlightCta.tsx";

type FilterKey = "all" | ProjectKind;

const filters: Array<{ key: FilterKey; label: { en: string; ar: string } }> = [
    { key: "all", label: { en: "All Projects", ar: "كل المشاريع" } },
    { key: "website", label: { en: "Websites", ar: "المواقع" } },
    { key: "platform", label: { en: "Platforms", ar: "المنصات" } },
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
            <section className="portfolio-hero ms-animate">
                <div className="ms-container">
                    <p className="portfolio-kicker">{lang === "ar" ? "أعمال مختارة" : "Selected work"}</p>
                    <h1>
                        {lang === "ar" ? "منتجات صممت لتجعل الخطوة التالية واضحة." : "Products designed to make the next move obvious."}
                    </h1>
                    <p className="portfolio-intro">
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

            <section className="portfolio-work-list-section">
                <div className="portfolio-work-list ms-container">
                    {visibleProjects.map((project, index) => (
                        <Link
                            key={project.slug}
                            to={`/portfolio/${project.slug}`}
                            className="portfolio-work-row"
                        >
                            <div className="portfolio-work-visual" data-index={String(index + 1).padStart(2, "0")}>
                                <img src={project.cover} alt={project.title[lang]} loading="eager" decoding="async" />
                            </div>
                            <div className="portfolio-work-copy">
                                <span>{project.category[lang]}</span>
                                <h2>{project.title[lang]}</h2>
                                <p>{project.intro[lang]}</p>
                                <small>{lang === "ar" ? "النتيجة" : "Outcome"}</small>
                                <p>{projectCaseStudies[project.slug].result[lang]}</p>
                                <div className="portfolio-work-link">{lang === "ar" ? "عرض دراسة الحالة" : "View case study"}<ArrowUpRight aria-hidden="true" /></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <FlightCta />
        </div>
    );
};

export default Portfolio;

