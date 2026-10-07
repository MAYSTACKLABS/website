import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { projectCaseStudies } from "../../data/projectCaseStudies.ts";
import { getProject } from "../../data/projectsData.ts";
import { usePageMetadata } from "../../hooks/usePageMetadata.ts";
import DeviceShowcase from "../../components/shared/DeviceShowcase.tsx";
import PhoneMockup from "../../components/shared/PhoneMockup.tsx";
import ProjectSummary from "../../components/shared/ProjectSummary.tsx";

export default function ProjectDetail() {
    const { slug } = useParams();
    const { lang } = useLanguage();
    const project=getProject(slug);
    const study=slug?projectCaseStudies[slug]:undefined;
    usePageMetadata({title:project?`${project.title[lang]} | Maystack`:"Selected work | Maystack",description:project?.intro[lang]??"Explore our work."});
    if(!project||!study) return <Navigate to="/portfolio" replace />;
    return <div className="project-detail-page">
        <header className="ms-container project-intro">
            <div className="project-topbar"><Link className="text-link" to="/portfolio"><ArrowLeft aria-hidden="true" />{lang==="ar"?"كل المشاريع":"Back to work"}</Link>{study.liveUrl&&<a className="button button-secondary" href={study.liveUrl} target={study.liveUrl.startsWith("http")?"_blank":undefined} rel={study.liveUrl.startsWith("http")?"noreferrer":undefined}>{lang==="ar"?"عرض الموقع":"View live site"}<ArrowUpRight aria-hidden="true" /></a>}</div>
            <div className="project-intro-grid"><div><h1>{project.title[lang]}</h1><ProjectSummary slug={project.slug} /></div><DeviceShowcase desktop={project.desktopImages[0]} mobile={project.mobileImages[0]} name={project.title[lang]} href={study.liveUrl} priority /></div>
        </header>
        <section className="ms-container project-story-grid">{([{key:"problem",en:"The challenge",ar:"التحدي"},{key:"solution",en:"Our approach",ar:"منهجنا"},{key:"result",en:"The outcome",ar:"النتيجة"}] as const).map(({key,en,ar},index)=><article key={key}><p className="eyebrow">0{index+1}</p><h2>{lang==="ar"?ar:en}</h2><p>{study[key][lang]}</p></article>)}</section>
        <section className="ms-container project-overview section-space"><div><h2>{lang==="ar"?"التفاصيل تصنع الفرق.":"The details make the difference."}</h2><p>{project.details[lang]}</p></div><ul>{project.highlights.map(item=><li key={item.en}><Check aria-hidden="true" />{item[lang]}</li>)}</ul></section>
        <section className="ms-container project-gallery">
            <div className="section-heading"><div><p className="eyebrow">{lang==="ar"?"داخل التجربة":"Inside the experience"}</p><h2>{lang==="ar"?"شاهد العمل عن قرب.":"See the work up close."}</h2></div></div>
            <div className="project-desktop-gallery" role="region" aria-label={lang === "ar" ? "معرض لقطات المشروع" : "Project screenshot gallery"}>{project.desktopImages.map((image,index)=><a href={image} target="_blank" rel="noreferrer" key={image} aria-label={lang==="ar"?`افتح لقطة ${index+1}`:`Open screenshot ${index+1}`}><img src={image} alt={`${project.title[lang]} — desktop ${index+1}`} loading="lazy" /></a>)}</div>
            <div className="project-mobile-gallery" role="region" aria-label={lang === "ar" ? "معرض شاشات الموبايل" : "Mobile screenshot gallery"}>{project.mobileImages.map((image,index)=><a href={image} target="_blank" rel="noreferrer" key={image} aria-label={`Open mobile screenshot ${index+1}`}><PhoneMockup image={image} name={`${project.title[lang]} — mobile ${index+1}`} /></a>)}</div>
        </section>
    </div>;
}

