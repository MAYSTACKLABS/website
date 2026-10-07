import { Search, PenTool, Code2, Rocket, BarChart3 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { useSectionProgress } from "../../hooks/useSectionProgress.ts";

const steps = [
    { Icon: Search, en: "Discover", ar: "الاكتشاف", text: "Your goals, your users, and the right problem to solve.", textAr: "أهدافك، ومستخدموك، والمشكلة الصحيحة التي نحتاج إلى حلها." },
    { Icon: PenTool, en: "Design", ar: "التصميم", text: "Clear journeys and thoughtful interfaces, tested before we build.", textAr: "مسارات واضحة وواجهات مدروسة نختبرها قبل البناء." },
    { Icon: Code2, en: "Build", ar: "البناء", text: "Reliable code, responsive experiences, and room to grow.", textAr: "برمجة موثوقة وتجارب متجاوبة ومساحة للنمو." },
    { Icon: Rocket, en: "Launch", ar: "الإطلاق", text: "The final checks, a smooth release, and a confident handover.", textAr: "اختبارات نهائية وإطلاق سلس وتسليم واضح." },
    { Icon: BarChart3, en: "Scale", ar: "النمو", text: "Keep learning, improving, and building on what works.", textAr: "نواصل التعلم والتحسين والبناء على ما ينجح." },
];
export default function Process() {
    const { lang } = useLanguage();
    const progressRef = useSectionProgress();
    return <section ref={progressRef} className="process section-space" aria-labelledby="process-title">
        <div className="ms-container process-layout">
            <div className="process-heading"><h2 id="process-title">{lang === "ar" ? <>فريق واحد.<br /><span>كل الخبرات.</span></> : <>One team.<br /><span>The full stack.</span></>}</h2><p>{lang === "ar" ? "استراتيجية وتصميم وتطوير في مسار واحد، من الفكرة الأولى إلى منتج ينمو معك." : "Strategy, design and development in one connected flow. From the first question to a product that keeps getting better."}</p></div>
            <div className="process-system"><div className="process-connector" aria-hidden="true"><span /><i /></div><ol className="process-steps">{steps.map(({ Icon, en, ar, text, textAr }, index) =>
                <li className="process-step" key={en}>
                    <span className="process-node"><Icon aria-hidden="true" /></span>
                    <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{lang === "ar" ? ar : en}</h3><p>{lang === "ar" ? textAr : text}</p></div>
                </li>
            )}</ol></div>
        </div>
    </section>;
}
