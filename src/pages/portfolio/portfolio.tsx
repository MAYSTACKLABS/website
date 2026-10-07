import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { type ProjectKind, projects } from "../../data/projectsData.ts";
import DeviceShowcase from "../../components/shared/DeviceShowcase.tsx";
import { projectBriefs } from "../../data/projectBriefs.ts";
import { usePageMetadata } from "../../hooks/usePageMetadata.ts";

type Filter = "all" | ProjectKind;
export default function Portfolio() {
    const { lang } = useLanguage();
    const [filter,setFilter] = useState<Filter>("all");
    const ordered=[...projects.filter(p=>p.slug!=="maystack"),...projects.filter(p=>p.slug==="maystack")];
    const visible=ordered.filter(p=>filter==="all"||p.kinds.includes(filter));
    usePageMetadata({title:lang==="ar"?"أعمالنا | مايستاك":"Selected work | Maystack",description:lang==="ar"?"اكتشف المواقع والمنصات التي صممناها وبنيناها.":"Explore the websites and platforms we have designed and built."});
    return <div className="portfolio-page">
        <header className="ms-container page-intro">
            <h1>{lang==="ar"?"أفكار طموحة. منتجات حقيقية.":"Ambitious ideas. Real world products."}</h1>
            <p>{lang==="ar"?"مواقع ومنصات صممت بعناية وبنيت لتخدم الناس الذين يستخدمونها.":"Websites and platforms, thoughtfully designed and built around the people who use them."}</p>
            <div className="portfolio-filters" aria-label={lang==="ar"?"تصفية المشاريع":"Filter projects"}>{([{key:"all",en:"All work",ar:"كل الأعمال"},{key:"website",en:"Websites",ar:"المواقع"},{key:"platform",en:"Platforms",ar:"المنصات"}] as const).map(({key,en,ar})=><button type="button" aria-pressed={filter===key} className={filter===key?"is-selected":""} onClick={()=>setFilter(key)} key={key}>{lang==="ar"?ar:en}<span>{key==="all"?projects.length:projects.filter(p=>p.kinds.includes(key)).length}</span></button>)}</div>
        </header>
        <section key={filter} className="ms-container portfolio-grid" aria-label={lang==="ar"?"المشاريع":"Projects"}>{visible.map((project)=>
            <Link className="portfolio-project" to={`/portfolio/${project.slug}`} key={project.slug}>
                <div className="portfolio-project-image"><DeviceShowcase desktop={project.desktopImages[0]} mobile={project.mobileImages[0]} name={project.title[lang]} /><span className="portfolio-project-arrow"><ArrowUpRight aria-hidden="true" /></span></div>
                <div className="portfolio-project-heading"><h2>{project.title[lang]}</h2></div>
                <p>{projectBriefs[project.slug]?.work[lang]}</p>
            </Link>
        )}</section>

    </div>;
}

