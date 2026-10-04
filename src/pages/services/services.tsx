import { Binoculars, Blocks, Compass, Rocket, TrendingUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.tsx";
import mountains from "../../assets/hero/optimized/mountains.webp";
import cloudBank from "../../assets/hero/optimized/cloud-bank.webp";
import floatingClouds from "../../assets/hero/optimized/floating-clouds.webp";
import sun from "../../assets/hero/optimized/sun.webp";
import moon from "../../assets/hero/optimized/moon.webp";
import bird from "../../assets/logos/white.png";

const process = [
    { title: { en: "Discover", ar: "الاكتشاف" }, description: { en: "We clarify the audience, goal, constraints, and opportunity before choosing a direction.", ar: "نوضح الجمهور والهدف والقيود والفرصة قبل اختيار الاتجاه." }, Icon: Binoculars },
    { title: { en: "Design", ar: "التصميم" }, description: { en: "We turn the direction into a clear product flow and a polished, testable interface.", ar: "نحوّل الاتجاه إلى مسار منتج واضح وواجهة مصقولة قابلة للاختبار." }, Icon: Compass },
    { title: { en: "Build", ar: "البناء" }, description: { en: "We develop a fast, maintainable system with reusable foundations and clean handoffs.", ar: "نطوّر نظاماً سريعاً وسهل الصيانة بأساس قابل لإعادة الاستخدام وتسليم واضح." }, Icon: Blocks },
    { title: { en: "Launch", ar: "الإطلاق" }, description: { en: "We test the critical paths, prepare the release, and launch with confidence.", ar: "نختبر المسارات الأساسية ونجهز الإصدار ونطلقه بثقة." }, Icon: Rocket },
    { title: { en: "Scale", ar: "النمو" }, description: { en: "We learn from real use, improve what matters, and extend the product without rebuilding it.", ar: "نتعلم من الاستخدام الحقيقي ونحسن ما يهم ونوسع المنتج دون إعادة بنائه." }, Icon: TrendingUp },
];

export default function Services() {
    const { lang } = useLanguage();

    return (
        <div className="ms-page services-page">
            <section className="services-hero">
                <div className="services-sky" aria-hidden="true" />
                <img className="services-orb services-sun" src={sun} alt="" />
                <img className="services-orb services-moon" src={moon} alt="" />
                <img className="services-floating-clouds" src={floatingClouds} alt="" />
                <img className="services-mountains" src={mountains} alt="" />
                <img className="services-cloud-bank" src={cloudBank} alt="" />

                <div className="ms-container services-hero-content ms-animate">
                    <p className="services-kicker">{lang === "ar" ? "طريقتنا" : "Our process"}</p>
                    <h1 id="services-process-title">{lang === "ar" ? "من الرؤية إلى أثر حقيقي." : "From vision to real impact."}</h1>
                    <span>{lang === "ar" ? "مسار واضح وتعاوني يحوّل الأفكار الطموحة إلى منتجات رقمية استثنائية." : "A clear, collaborative process that turns ambitious ideas into exceptional digital products."}</span>
                </div>
            </section>

            <section className="services-process" aria-labelledby="services-process-title">
                <div className="ms-container services-process-layout">
                    <ol className="services-process-list">
                        {process.map(({ title, description, Icon }, index) => (
                            <li className="services-process-step ms-animate" key={title.en}>
                                <span className="services-process-icon"><Icon aria-hidden="true" /></span>
                                <small>{String(index + 1).padStart(2, "0")}</small>
                                <div><h3>{title[lang]}</h3><p>{description[lang]}</p></div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="services-closing" aria-label={lang === "ar" ? "الأفكار اليوم، الأثر غداً" : "Ideas today, impact tomorrow"}>
                <p>{lang === "ar" ? "أفكار اليوم. أثر الغد." : "Ideas today. Impact tomorrow."}</p>
                <img className="services-closing-bird" src={bird} alt="" />
                <img className="services-closing-mountains" src={mountains} alt="" />
                <img className="services-closing-clouds" src={cloudBank} alt="" />
            </section>
        </div>
    );
}

