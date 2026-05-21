import { type CSSProperties } from "react";
import { ArrowLeft, CheckCircle2, Image, MonitorSmartphone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { getProject } from "./projectsData.ts";

const kindLabels = {
    website: { en: "Website", ar: "موقع" },
    platform: { en: "Platform", ar: "منصة" },
    mobile: { en: "Mobile app", ar: "تطبيق موبايل" },
};

export default function ProjectDetail() {
    const { slug } = useParams();
    const { lang } = useLanguage();
    const project = getProject(slug);

    if (!project) {
        return <Navigate to="/portfolio" replace />;
    }

    return (
        <div className="ms-page project-detail-page" style={{ "--project-accent": project.accent } as CSSProperties}>
            <section className="project-detail-hero px-5 pb-12 pt-24 md:pb-16 md:pt-28">
                <div className="ms-container">
                    <Link to="/portfolio" className="project-back-link">
                        <ArrowLeft className="h-4 w-4" />
                        {lang === "ar" ? "العودة للأعمال" : "Back to work"}
                    </Link>

                    <div className="project-detail-showcase-grid mt-8">
                        <div className="project-detail-intro">
                            <p className="project-kicker">{project.category[lang]}</p>
                            <h1>
                                {project.title[lang]}
                            </h1>
                            <p>
                                {project.intro[lang]}
                            </p>

                            <div className="project-detail-meta">
                                <span>{project.kinds.map((kind) => kindLabels[kind][lang]).join(" / ")}</span>
                                <span>{lang === "ar" ? `${project.desktopImages.length} لقطات ديسكتوب` : `${project.desktopImages.length} desktop screens`}</span>
                                <span>{lang === "ar" ? `${project.mobileImages.length} لقطات موبايل` : `${project.mobileImages.length} mobile views`}</span>
                            </div>
                        </div>

                        <div className="project-detail-cover">
                            <img src={project.cover} alt={project.title[lang]} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-14">
                <div className="ms-container project-detail-overview">
                    <div className="project-detail-copy">
                        <h2>{lang === "ar" ? "عن المشروع" : "Project Details"}</h2>
                        <p>{project.details[lang]}</p>
                    </div>

                    <div className="project-detail-highlights">
                        <div className="project-panel-heading">
                            <MonitorSmartphone className="h-5 w-5" />
                            <span>{lang === "ar" ? "ما تم التركيز عليه" : "What mattered most"}</span>
                        </div>
                        {project.highlights.map((highlight) => (
                            <div key={highlight.en} className="project-highlight">
                                <CheckCircle2 className="h-5 w-5" />
                                <span>{highlight[lang]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20">
                <div className="ms-container">
                    <div className="project-gallery-header">
                        <div className="project-panel-heading">
                            <Image className="h-5 w-5" />
                            <span>{lang === "ar" ? "المعرض" : "Gallery"}</span>
                        </div>
                        <h2>{lang === "ar" ? "لقطات من التجربة" : "Screens from the build"}</h2>
                        <p>{lang === "ar" ? "عرض واضح للديسكتوب والموبايل من داخل المشروع." : "Desktop and mobile views presented with room to inspect the work."}</p>
                    </div>

                    <div className="project-desktop-gallery">
                        {project.desktopImages.map((image, index) => (
                            <img key={image} src={image} alt={`${project.title[lang]} desktop ${index + 1}`} />
                        ))}
                    </div>

                    <div className="project-mobile-gallery">
                        {project.mobileImages.map((image, index) => (
                            <div key={image} className="project-phone-frame">
                                <img src={image} alt={`${project.title[lang]} mobile ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
