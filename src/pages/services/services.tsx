import { ArrowRight, Binoculars, Blocks, Code2, Compass, Globe2, Palette, Rocket, Smartphone, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import mountains from "../../assets/hero/optimized/mountains.webp";
import cloudBank from "../../assets/generated/cloud-bank-v2.png";
import sun from "../../assets/hero/optimized/sun.webp";
import moon from "../../assets/hero/optimized/moon.webp";
import mobilePreview from "../../assets/projects/snowball/mobile1.png";
import webPreview from "../../assets/projects/core/1.png";
import platformPreview from "../../assets/projects/snowball/1.png";
import designPreview from "../../assets/projects/maystack/2.png";
import FlightCta from "../home/FlightCta.tsx";

const process = [
    { title: { en: "Discover", ar: "الاكتشاف" }, description: { en: "We clarify the audience, goal, constraints, and opportunity before choosing a direction.", ar: "نوضح الجمهور والهدف والقيود والفرصة قبل اختيار الاتجاه." }, Icon: Binoculars },
    { title: { en: "Design", ar: "التصميم" }, description: { en: "We turn the direction into a clear product flow and a polished, testable interface.", ar: "نحوّل الاتجاه إلى مسار منتج واضح وواجهة مصقولة قابلة للاختبار." }, Icon: Compass },
    { title: { en: "Build", ar: "البناء" }, description: { en: "We develop a fast, maintainable system with reusable foundations and clean handoffs.", ar: "نطوّر نظاماً سريعاً وسهل الصيانة بأساس قابل لإعادة الاستخدام وتسليم واضح." }, Icon: Blocks },
    { title: { en: "Launch", ar: "الإطلاق" }, description: { en: "We test the critical paths, prepare the release, and launch with confidence.", ar: "نختبر المسارات الأساسية ونجهز الإصدار ونطلقه بثقة." }, Icon: Rocket },
    { title: { en: "Scale", ar: "النمو" }, description: { en: "We learn from real use, improve what matters, and extend the product without rebuilding it.", ar: "نتعلم من الاستخدام الحقيقي ونحسن ما يهم ونوسع المنتج دون إعادة بنائه." }, Icon: TrendingUp },
];

const offerings = [
    { Icon: Palette, title: { en: "UI/UX design", ar: "تصميم UI/UX" }, text: { en: "Research, product flows, wireframes, interfaces and design systems that make complex products feel obvious.", ar: "بحث ومسارات منتجات ونماذج أولية وواجهات وأنظمة تصميم تجعل المنتجات المعقدة واضحة." }, image: designPreview },
    { Icon: Smartphone, title: { en: "Mobile applications", ar: "تطبيقات الموبايل" }, text: { en: "Responsive mobile experiences designed around real tasks, repeat use and confident interaction.", ar: "تجارب موبايل متجاوبة مصممة حول المهام الحقيقية والاستخدام المتكرر والتفاعل الواضح." }, image: mobilePreview },
    { Icon: Globe2, title: { en: "Web development", ar: "تطوير الويب" }, text: { en: "Fast, accessible websites and web applications built with maintainable frontend systems.", ar: "مواقع وتطبيقات ويب سريعة ومتاحة مبنية بأنظمة واجهات سهلة الصيانة." }, image: webPreview },
    { Icon: Code2, title: { en: "Custom platforms", ar: "منصات مخصصة" }, text: { en: "Dashboards, portals and workflow tools shaped around how your organization actually works.", ar: "لوحات تحكم وبوابات وأدوات عمل مصممة حول طريقة عمل مؤسستك فعلياً." }, image: platformPreview },
];

export default function Services() {
    const { lang } = useLanguage();

    return (
        <div className="ms-page services-page">
            <section className="services-hero">
                <div className="ms-container services-hero-content ms-animate">
                    <p className="services-kicker">{lang === "ar" ? "خدمات مايستاك" : "Maystack services"}</p>
                    <h1>{lang === "ar" ? "نصمم ونبني منتجات رقمية متكاملة." : "We design and build complete digital products."}</h1>
                    <span>{lang === "ar" ? "من أول مسار مستخدم إلى المنتج النهائي: التصميم، تطبيقات الموبايل، تطوير الويب والمنصات المخصصة في فريق واحد." : "From the first user flow to the shipped product: UI/UX, mobile apps, web development and custom platforms in one team."}</span>
                    <Link className="services-hero-cta" to="/contact">{lang === "ar" ? "ناقش مشروعك" : "Discuss your project"}<ArrowRight aria-hidden="true" /></Link>
                </div>
                <img className="services-mountains" src={mountains} alt="" aria-hidden="true" />
                <img className="services-orb services-sun" src={sun} alt="" aria-hidden="true" />
                <img className="services-orb services-moon" src={moon} alt="" aria-hidden="true" />
                <img className="services-cloud-bank" src={cloudBank} alt="" aria-hidden="true" />
            </section>

            <section className="services-offerings" aria-labelledby="offerings-title">
                <div className="ms-container">
                    <div className="services-section-heading"><p>{lang === "ar" ? "ما الذي نبنيه" : "What we build"}</p><h2 id="offerings-title">{lang === "ar" ? "أربع قدرات. تجربة واحدة." : "Four capabilities. One connected team."}</h2></div>
                    <div className="services-offering-list">
                        {offerings.map(({ Icon, title, text, image }, index) => (
                            <article className="services-offering ms-animate" key={title.en}>
                                <span className="services-offering-number">{String(index + 1).padStart(2, "0")}</span>
                                <div className="services-offering-copy"><Icon aria-hidden="true" /><h3>{title[lang]}</h3><p>{text[lang]}</p></div>
                                <div className="services-offering-visual"><img src={image} alt="" loading="lazy" /></div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services-process" aria-labelledby="services-process-title">
                <div className="ms-container services-process-layout">
                    <div className="services-section-heading"><p>{lang === "ar" ? "طريقة العمل" : "How we work"}</p><h2 id="services-process-title">{lang === "ar" ? "من الفكرة إلى الإطلاق بدون فقدان التفاصيل." : "From idea to launch without losing the details."}</h2></div>
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
            <FlightCta />
        </div>
    );
}

