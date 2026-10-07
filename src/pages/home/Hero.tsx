import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import Landscape from "../../components/shared/Landscape.tsx";

const stars = [[8,17],[23,10],[42,24],[53,15],[62,37],[88,48],[17,57],[40,49],[91,22]];

export default function Hero() {
    const { lang } = useLanguage();
    return <section className="home-hero">
        <div className="hero-stars" aria-hidden="true">{stars.map(([x,y],i)=><span key={i} className={i%3===0 ? "is-bright" : ""} style={{left:`${x}%`,top:`${y}%`}} />)}</div>
        <Landscape className="hero-landscape" flight />
        <div className="ms-container hero-layout">
            <div className="hero-copy">
                <h1>{lang === "ar" ? <>من فكرة<span>إلى القمة</span></> : <>From idea<span>To altitude</span></>}</h1>
                <p className="hero-description">{lang === "ar" ? "استراتيجية، تصميم وهندسة" : "Strategy, design and engineering"}</p>
                <div className="hero-actions">
                    <Link className="button" to="/contact">{lang === "ar" ? "ابدأ مشروعاً" : "Start a project"}<ArrowUpRight aria-hidden="true" /></Link>
                    <Link className="button button-secondary" to="/portfolio">{lang === "ar" ? "اكتشف أعمالنا" : "Explore our projects"}<ArrowUpRight aria-hidden="true" /></Link>
                </div>
                <p className="sr-only">{lang === "ar" ? "تصميم الواجهات وتجربة المستخدم، تطبيقات الموبايل، وتطوير المواقع والمنصات." : "UI/UX design, mobile applications, websites, and custom platforms."}</p>
            </div>
        </div>
    </section>;
}
