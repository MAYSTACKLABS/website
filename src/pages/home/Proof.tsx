import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { projects } from "../portfolio/projectsData.ts";
import { projectCaseStudies } from "../portfolio/projectCaseStudies.ts";

export default function Proof() {
    const { lang } = useLanguage();
    const featured = projects.filter((project) => project.slug !== "maystack").slice(0, 3);

    return (
        <section className="ms-proof-section" aria-labelledby="proof-title">
            <div className="ms-container">
                <div className="ms-proof-heading ms-animate">
                    <p className="ms-section-label">{lang === "ar" ? "نتائج العملاء" : "Client outcomes"}</p>
                    <h2 id="proof-title">{lang === "ar" ? "النتيجة أهم من الزينة." : "The result matters more than decoration."}</h2>
                    <span>
                        {lang === "ar"
                            ? "نركّز على التحسين الواضح الذي قدّمه كل مشروع للتجربة والمنتج."
                            : "A clear look at how each build improved the experience, sharpened the message, and made the product easier to use."}
                    </span>
                </div>

                <div className="ms-proof-list">
                    {featured.map((project, index) => (
                        <article className="ms-proof-item ms-animate" key={project.slug}>
                            <span className="ms-proof-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                            <p>{projectCaseStudies[project.slug].result[lang]}</p>
                            <div>
                                <span>{project.title[lang]}</span>
                                <Link to={`/portfolio/${project.slug}`} aria-label={`${project.title[lang]} case study`}>
                                    <ArrowUpRight aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
