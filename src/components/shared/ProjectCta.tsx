import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import Landscape from "./Landscape.tsx";

export default function ProjectCta() {
    const { lang } = useLanguage();
    return <section className="project-cta is-scenic">
        <Landscape className="landscape-cta" orb={false} />
        <div className="cta-scenic-heading"><h2>{lang === "ar" ? "لنبنِ معاً شيئاً يستحق الإطلاق." : "Let’s build something worth launching."}</h2></div>
        <div className="ms-container project-cta-content">
            <div className="project-cta-actions"><Link className="button" to="/contact">{lang === "ar" ? "ابدأ مشروعاً" : "Start a project"}<ArrowUpRight aria-hidden="true" /></Link><Link className="button button-secondary" to="/portfolio">{lang === "ar" ? "شاهد أعمالنا" : "See the work"}<ArrowUpRight aria-hidden="true" /></Link></div>
        </div>
    </section>;
}
