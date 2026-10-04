import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import mountains from "../../assets/hero/optimized/mountains.webp";
import clouds from "../../assets/generated/cloud-bank-v2.png";

export default function FlightCta() {
    const { lang } = useLanguage();

    return (
        <section className="ms-flight-cta" aria-labelledby="flight-title">
            <img className="ms-flight-mountains" src={mountains} alt="" aria-hidden="true" />
            <img className="ms-flight-clouds" src={clouds} alt="" aria-hidden="true" />
            <div className="ms-flight-content ms-animate">
                <p>{lang === "ar" ? "لنبدأ ما هو قادم" : "Let’s build what’s next"}</p>
                <h2 id="flight-title">{lang === "ar" ? "جاهز للإقلاع؟" : "Ready to take off?"}</h2>
                <span>
                    {lang === "ar"
                        ? "سواء كانت لديك فكرة واضحة أو مجرد بداية، سنحوّلها إلى خطة عملية ومنتج يستحق الإطلاق."
                        : "Whether you have a clear brief or only the first spark, we’ll turn it into a practical plan and a product worth launching."}
                </span>
                <div>
                    <Link className="ms-flight-primary" to="/contact">
                        {lang === "ar" ? "ابدأ مشروعاً" : "Start a project"}
                        <ArrowRight aria-hidden="true" />
                    </Link>
                    <Link className="ms-flight-secondary" to="/portfolio">
                        {lang === "ar" ? "شاهد الأعمال" : "See the work"}
                    </Link>
                </div>
            </div>
        </section>
    );
}
