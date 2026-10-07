import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { services } from "../../data/services.ts";
import Process from "../../components/shared/Process.tsx";
import DeviceShowcase from "../../components/shared/DeviceShowcase.tsx";
import MobileServiceVisual from "../../components/shared/MobileServiceVisual.tsx";
import { usePageMetadata } from "../../hooks/usePageMetadata.ts";

export default function Services() {
    const { lang } = useLanguage();
    usePageMetadata({ title: lang==="ar" ? "خدماتنا | مايستاك" : "Design & development services | Maystack", description: lang==="ar" ? "تصميم واجهات وتطبيقات موبايل وتطوير مواقع ومنصات مخصصة، مع فريق واحد." : "Product design, mobile applications, websites and custom platforms, brought together by one team." });
    return <div className="services-page">
        <header className="ms-container page-intro services-intro">
            <div className="services-intro-grid"><h1>{lang==="ar"?<>من أول فكرة.<br />إلى آخر تفصيلة.</>:<>From the first idea.<br />To the final detail.</>}</h1><div><p>{lang==="ar"?"تصميم وتطوير يجمعان الصورة كاملة. نساعدك في بناء المنتج المناسب، ونجعل كل جزء منه يعمل بانسجام.":"Design and development that see the whole picture. We help you build the right product, and make every part work together."}</p><Link className="text-link" to="/contact">{lang==="ar"?"ناقش مشروعك":"Discuss your project"}<ArrowUpRight aria-hidden="true" /></Link></div></div>
        </header>
        <div className="ms-container services-list">{services.map(({id,Icon,title,description,deliverables,project},index)=>
            <section className={`service-detail service-detail--${id}`} id={id} key={id}>
                <div className="service-copy"><p className="eyebrow">0{index+1} <Icon aria-hidden="true" /></p><h2>{title[lang]}</h2><p>{description[lang]}</p><ul>{deliverables[lang].map(item=><li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><Link className="text-link" to="/contact">{lang==="ar"?"لنبدأ":"Let’s make it happen"}<ArrowUpRight aria-hidden="true" /></Link></div>
                <div className={`service-preview service-preview-${id}`}>
                    {id==="mobile" ? <MobileServiceVisual /> : id==="web" ? <DeviceShowcase desktop={project.desktopImages[0]} mobile={project.mobileImages[0]} name={project.title[lang]} href={`/portfolio/${project.slug}`} /> : <div className="browser-preview"><img src={project.desktopImages[0]} alt={project.title[lang]} loading="lazy" /></div>}
                </div>
            </section>
        )}</div>
        <Process />
    </div>;
}

