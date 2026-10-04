import { ArrowRight, Binoculars, Blocks, Compass, Rocket, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import fullStackVisual from "../../assets/home/fullStackVisual.webp";

const journey = [
    {
        title: { en: "Discover", ar: "الاكتشاف" },
        description: { en: "Find the real opportunity, audience, and constraints before we design.", ar: "نحدد الفرصة الحقيقية والجمهور والقيود قبل أن نبدأ التصميم." },
        Icon: Binoculars,
    },
    {
        title: { en: "Design", ar: "التصميم" },
        description: { en: "Turn the direction into a clear, testable product experience.", ar: "نحوّل الاتجاه إلى تجربة منتج واضحة وقابلة للاختبار." },
        Icon: Compass,
    },
    {
        title: { en: "Build", ar: "البناء" },
        description: { en: "Develop a fast, maintainable system with reusable foundations.", ar: "نطوّر نظاماً سريعاً وسهل الصيانة بأساس قابل لإعادة الاستخدام." },
        Icon: Blocks,
    },
    {
        title: { en: "Launch", ar: "الإطلاق" },
        description: { en: "Ship confidently with quality checks, analytics, and a clean handoff.", ar: "نطلق بثقة بعد اختبارات الجودة والتحليلات وتسليم واضح." },
        Icon: Rocket,
    },
    {
        title: { en: "Scale", ar: "النمو" },
        description: { en: "Learn from real use, improve the product, and extend what works.", ar: "نتعلم من الاستخدام الحقيقي ونحسن المنتج ونوسع ما ينجح." },
        Icon: TrendingUp,
    },
];

export default function Why() {
    const { lang } = useLanguage();

    return (
        <section className="ms-full-stack" id="why">
            <div className="ms-container ms-full-stack-layout">
                <div className="ms-full-stack-copy ms-animate">
                    <p className="ms-section-label">{lang === "ar" ? "طريقة العمل" : "How the work moves"}</p>
                    <h2>
                        {lang === "ar" ? "فريق واحد. كل الخبرات." : <>One team.<br />The full stack.</>}
                    </h2>
                    <span>
                        {lang === "ar"
                            ? "من الفكرة إلى الإطلاق، يبقى الاستراتيجية والتصميم والتطوير في مسار واحد بلا تسليمات ضائعة."
                            : "From first idea to a confident launch, strategy, design, and engineering stay in one connected flow."}
                    </span>
                    <Link className="ms-outline-cta" to="/contact">
                        {lang === "ar" ? "ابدأ مشروعاً" : "Start a project"}
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </div>

                <ol className="ms-journey-list ms-animate">
                    {journey.map(({ title, description, Icon }, index) => (
                        <li className="ms-journey-step" key={title.en}>
                            <span className="ms-journey-node"><Icon aria-hidden="true" /></span>
                            <div>
                                <small>{String(index + 1).padStart(2, "0")}</small>
                                <h3>{title[lang]}</h3>
                                <p>{description[lang]}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="ms-full-stack-visual ms-animate" aria-hidden="true">
                    <div className="ms-full-stack-glow" />
                    <div className="ms-full-stack-media">
                        <img src={fullStackVisual} alt="" loading="lazy" decoding="async" />
                    </div>
                </div>
            </div>
        </section>
    );
}
